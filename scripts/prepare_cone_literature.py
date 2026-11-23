#!/usr/bin/env python3
"""Register the Das+2006 geometric reference to the frozen F502N lab grid.

Reads research artifacts only. No fitted mask or U-Net output sets this geometry.
Use the research Python environment (numpy/scipy/astropy).
"""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from astropy import units as u
from astropy.io import fits
from astropy.wcs import WCS
from scipy.ndimage import gaussian_filter, zoom
from scipy.spatial import ConvexHull


def projected_cap(half_opening, inclination, pa, axial_arcsec, samples=512):
    """Orthographic projection of the end ring; sky coordinates are E, N."""
    phi = np.linspace(0, 2 * np.pi, samples, endpoint=False)
    alpha, inc, angle = np.deg2rad([half_opening, inclination, pa])
    radius = axial_arcsec * np.tan(alpha)
    along = axial_arcsec * np.cos(inc) - radius * np.sin(inc) * np.cos(phi)
    across = radius * np.sin(phi)
    return np.column_stack((along * np.sin(angle) + across * np.cos(angle),
                            along * np.cos(angle) - across * np.sin(angle)))


def footprint(half_opening, extent):
    cap = projected_cap(half_opening, 5, 30, extent)
    points = np.vstack(([0, 0], cap))
    return points[ConvexHull(points).vertices]


def export(repo, case_path):
    snapshot = repo / 'saved_runs/ngc1068_20260514'
    settings = json.loads((snapshot / 'settings.json').read_text())['scripts']['two_component_continuum.py']
    o3_path, cont_path = [repo / settings[k] for k in ['O3_FILE', 'CONT_FILE']]
    o3 = np.nan_to_num(fits.getdata(o3_path, 1).astype(np.float32))
    cont = np.nan_to_num(fits.getdata(cont_path, 1).astype(np.float32))
    wcs = WCS(fits.getheader(o3_path, 1)).celestial
    valid = (o3 > 0) & (cont > 0)
    smooth = gaussian_filter(cont * valid, sigma=5)
    smooth[:50, :] = smooth[-50:, :] = 0
    smooth[:, :50] = smooth[:, -50:] = 0
    ny, nx = np.unravel_index(smooth.argmax(), smooth.shape)
    r0, c0 = max(0, ny - 200), max(0, nx - 200)
    # Verify the crop registration against the saved linear observation itself.
    observed = o3[r0:ny + 200, c0:nx + 200]
    continuum = gaussian_filter(cont[r0:ny + 200, c0:nx + 200], .5)
    params = json.loads((repo / 'data/2d/ngc1068_two_component/cone_params.json').read_text())
    recovered = observed - continuum * np.float32(params['scale_factor'])
    yy, xx = np.indices(recovered.shape)
    recovered[np.hypot(xx - (nx - c0), yy - (ny - r0)) < 15] = 0
    recovered[~valid[r0:ny + 200, c0:nx + 200]] = 0
    saved = np.load(repo / 'data/2d/ngc1068_two_component/emission_map.npy')
    if not np.array_equal(recovered, saved):
        raise ValueError('Cannot verify saved-image crop against source FITS')
    positive = np.clip(saved, 0, None)
    scale = np.percentile(positive[positive > 0], 97)
    asinh = (np.arcsinh(positive / (scale + 1e-8)) / np.arcsinh(1.)).astype(np.float32)
    if not np.array_equal(asinh, np.load(repo / 'data/2d/ngc1068_two_component/emission_map_asinh.npy')):
        raise ValueError('Cannot verify saved asinh image against registered emission map')
    case = json.loads(case_path.read_text())
    width, height = case['width'], case['height']
    crop = case['source']['crop']
    clipped = np.clip(asinh[crop['y0']:crop['y1'], crop['x0']:crop['x1']], 0, 1)
    frozen_input = np.flipud(zoom(clipped, (height / clipped.shape[0], width / clipped.shape[1]), order=1))
    if not np.array_equal(np.round(frozen_input, 6).ravel(), np.asarray(case['input'], dtype=np.float32)):
        raise ValueError('Frozen lab input does not match the verified registered image')
    # scipy.ndimage.zoom(grid_mode=False) aligns first and last pixel centers.
    sx = (width - 1) / (crop['x1'] - crop['x0'] - 1)
    sy = (height - 1) / (crop['y1'] - crop['y0'] - 1)
    hotspot = wcs.pixel_to_world(nx, ny)
    center = hotspot.spherical_offsets_by(-.02 * u.arcsec, -.13 * u.arcsec)

    def to_display(east, north, origin=center):
        sky = origin.spherical_offsets_by(np.asarray(east) * u.arcsec, np.asarray(north) * u.arcsec)
        x, y = wcs.world_to_pixel(sky)
        return np.column_stack(((x - c0 - crop['x0']) * sx,
                                height - 1 - (y - r0 - crop['y0']) * sy))

    def polygon_for(half, sign=1, origin=center):
        sky = footprint(half, 400 / 72) * sign
        return to_display(sky[:, 0], sky[:, 1], origin)

    outlines = [polygon_for(40, sign) for sign in [1, -1]]
    inner = [polygon_for(20, sign) for sign in [1, -1]]
    # Convex polygon membership at the same pixel centers as the image/masks.
    yy, xx = np.indices((height, width))
    pixels = np.column_stack((xx.ravel(), yy.ravel()))
    mask = np.zeros(width * height, dtype=bool)
    for polygon in outlines:
        hull = ConvexHull(polygon)
        mask |= np.all(pixels @ hull.equations[:, :2].T + hull.equations[:, 2] <= 1e-9, axis=1)
    round_points = lambda p: np.round(p, 4).tolist()
    beta = np.rad2deg(np.arcsin(np.sin(np.deg2rad(40)) / np.cos(np.deg2rad(5))))
    east, north = to_display([1, 0], [0, 1])
    center_pixel = to_display([0], [0])[0]
    model = np.asarray(case['modelMask'], dtype=bool)
    iou = float(np.logical_and(model, mask).sum() / np.logical_or(model, mask).sum())
    case['literature'] = {
        'label': 'Das et al. (2006) projected outflow geometry',
        'url': 'https://arxiv.org/abs/astro-ph/0603803',
        'paperUrl': 'https://arxiv.org/pdf/astro-ph/0603803',
        'doi': '10.1086/504899', 'locations': 'Sections 2 and 4; Table 2',
        'parameters': {'skyPaDeg': 30, 'innerHalfOpeningDeg': 20, 'outerHalfOpeningDeg': 40,
                       'inclinationFromSkyPlaneDeg': 5, 'nearerLobe': 'NE', 'axialExtentPc': 400,
                       'angleUncertaintyDeg': 2, 'axialExtentUncertaintyPc': 16,
                       'adoptedDistanceMpc': 14.4, 'adoptedPcPerArcsec': 72},
        'projectedFullOuterOpeningDeg': float(2 * beta),
        'mask': mask.astype('uint8').tolist(),
        'outerOutlines': [round_points(p) for p in outlines],
        'innerWallGuides': [round_points(p) for p in inner],
        'centerPixel': round_points(center_pixel),
        'compassVectors': {'east': round_points(east - center_pixel), 'north': round_points(north - center_pixel)},
        'centeringChecks': [[round_points(polygon_for(40, sign, center.spherical_offsets_by(de * u.arcsec, dn * u.arcsec))) for sign in [1, -1]] for de, dn in [(-.1, 0), (.1, 0), (0, -.1), (0, .1)]],
        'expectedModelIoU': iou,
        'projection': 'Orthographic finite circular bicone. Convex hull of apex and projected end ring at axial distance 400 pc. The projected outer-wall footprint is filled; inner-wall outlines do not imply an empty 2D wedge. Both lobes clipped to the lab image for overlap.',
        'angularScale': 'Uses the paper’s stated 72 pc/arcsec for its 400 pc length. The paper also adopts 14.4 Mpc; its rounded angular scale differs from the exact small-angle conversion (~69.81 pc/arcsec). We retain its stated scale for this reference, not a new distance estimate.',
        'registration': {
            'method': 'Saved F547M Gaussian-sigma=5 px peak as optical-hotspot proxy, then paper offset: 0.02 arcsec west and 0.13 arcsec south to hidden nucleus. FITS celestial WCS -> verified 400 px source crop -> saved inference crop -> endpoint-aligned 128 px resample -> vertical flip.',
            'hotspotProxyFullPixel': [int(nx), int(ny)],
            'hotspotProxyRaDecDeg': [hotspot.ra.deg, hotspot.dec.deg],
            'adoptedNucleusRaDecDeg': [center.ra.deg, center.dec.deg],
            'coordinateFrame': center.frame.name,
            'equinox': str(center.equinox) if hasattr(center, 'equinox') else None,
            'sourceCropOriginPixel': [int(c0), int(r0)],
            'displayScale': [sx, sy],
            'wcsHeader': wcs.to_header().tostring(sep='\n', endcard=False, padding=False),
            'relativeOffsetUncertaintyArcsec': .10,
            'limits': 'The smoothed continuum peak is a hotspot proxy, not a measured astrometric identification. The paper quotes ±0.10 arcsec per relative-offset component. Centering checks shift the adopted center by ±0.10 arcsec along E/N; they are sensitivity trials, not a confidence contour. No empirical star-based registration has been performed.',
            'savedEmissionReconstructionMaxAbsError': float(np.max(np.abs(recovered - saved)))
        },
        'limits': 'Published kinematic fit, not a ground-truth emission segmentation or torus measurement. The footprint denotes permitted projected geometry, not predicted brightness. Gas distribution, extinction and sensitivity can change visible morphology. No uncertainty propagation or refit was performed.',
        'sourceSha256': {str(p.relative_to(repo)): hashlib.sha256(p.read_bytes()).hexdigest() for p in [o3_path, cont_path, snapshot / 'source/two_component_continuum.py']},
    }
    case_path.write_text(json.dumps(case, separators=(',', ':')))
    print(json.dumps({'projectedFullOpeningDeg': 2 * beta, 'centerPixel': round_points(center_pixel),
                      'literaturePixels': int(mask.sum()), 'modelLiteratureIoU': iou,
                      'verifiedSavedImage': True}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--case', type=Path, default=Path('public/labs/cones/ngc1068.json'))
    args = parser.parse_args()
    export(args.repo.resolve(), args.case)
