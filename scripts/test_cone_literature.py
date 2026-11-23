"""Independent geometric/WCS checks for the published web-lab reference."""
import json
from pathlib import Path
import unittest

import numpy as np
from astropy import units as u
from astropy.coordinates import SkyCoord
from astropy.io.fits import Header
from astropy.wcs import WCS


class LiteratureProjectionTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.case = json.loads((Path(__file__).resolve().parents[1] / 'public/labs/cones/ngc1068.json').read_text())
        cls.lit = cls.case['literature']
        cls.reg = cls.lit['registration']
        cls.wcs = WCS(Header.fromstring(cls.reg['wcsHeader'], sep='\n'))
        frame = cls.wcs.pixel_to_world(0, 0).frame.replicate_without_data()
        cls.center = SkyCoord(*cls.reg['adoptedNucleusRaDecDeg'], unit=u.deg, frame=frame)

    def sky_at_display(self, x, y):
        crop = self.case['source']['crop']
        c0, r0 = self.reg['sourceCropOriginPixel']
        sx, sy = self.reg['displayScale']
        return self.wcs.pixel_to_world(x / sx + c0 + crop['x0'],
                                      (self.case['height'] - 1 - y) / sy + r0 + crop['y0'])

    def test_footprint_against_independent_line_of_sight_intersections(self):
        # Analytic ray/cone quadratic, independent of the exporter’s cap/hull method.
        yy, xx = np.indices((self.case['height'], self.case['width']))
        east, north = self.center.spherical_offsets_to(self.sky_at_display(xx, yy))
        east, north = east.arcsec, north.arcsec
        p = self.lit['parameters']
        pa, inc, alpha = np.deg2rad([p['skyPaDeg'], p['inclinationFromSkyPlaneDeg'], p['outerHalfOpeningDeg']])
        projected_axis_dot = (east * np.sin(pa) + north * np.cos(pa)) * np.cos(inc)
        a = np.sin(inc)**2 - np.cos(alpha)**2
        b = 2 * projected_axis_dot * np.sin(inc)
        c = projected_axis_dot**2 - np.cos(alpha)**2 * (east**2 + north**2)
        discriminant = b*b - 4*a*c
        root = np.sqrt(np.maximum(0, discriminant))
        t1, t2 = (-b - root) / (2*a), (-b + root) / (2*a)
        lo, hi = np.minimum(t1, t2), np.maximum(t1, t2)
        zmax = p['axialExtentPc'] / p['adoptedPcPerArcsec']
        lo = np.maximum(lo, (-zmax - projected_axis_dot) / np.sin(inc))
        hi = np.minimum(hi, (zmax - projected_axis_dot) / np.sin(inc))
        expected = ((discriminant >= 0) & (hi >= lo)).astype('uint8').ravel()
        np.testing.assert_array_equal(expected, self.lit['mask'])

    def test_registration_and_compass(self):
        cx, cy = self.lit['centerPixel']
        self.assertLess(self.center.separation(self.sky_at_display(cx, cy)).arcsec, .00001)
        for name, pa in [('north', 0), ('east', 90)]:
            dx, dy = self.lit['compassVectors'][name]
            sky = self.sky_at_display(cx + dx, cy + dy)
            target = self.center.directional_offset_by(pa * u.deg, 1 * u.arcsec)
            self.assertLess(sky.separation(target).arcsec, .00002)
        # North-up/east-left here is derived from FITS, not assumed by the exporter.
        self.assertLess(self.lit['compassVectors']['north'][1], 0)
        self.assertLess(self.lit['compassVectors']['east'][0], 0)

    def test_hollow_shell_is_not_an_empty_projected_inner_wedge(self):
        # LOS can intersect a 3D outer wall on the projected central axis.
        pa = np.deg2rad(self.lit['parameters']['skyPaDeg'])
        sky = self.center.spherical_offsets_by(np.sin(pa) * u.arcsec, np.cos(pa) * u.arcsec)
        x, y = self.wcs.world_to_pixel(sky)
        c0, r0 = self.reg['sourceCropOriginPixel']
        crop = self.case['source']['crop']
        sx, sy = self.reg['displayScale']
        col = round((x - c0 - crop['x0']) * sx)
        row = round(self.case['height'] - 1 - (y - r0 - crop['y0']) * sy)
        self.assertEqual(self.lit['mask'][row * self.case['width'] + col], 1)


if __name__ == '__main__':
    unittest.main()
