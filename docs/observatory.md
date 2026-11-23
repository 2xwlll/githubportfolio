# After-hours observatory

The public entry point is `/observatory`, linked by Professor Ribbit’s small **Come learn!** invitation beside the homepage’s selected projects and **After hours** in the footer. The hero remains focused on the scientific introduction. The interactive pages are `/observatory/cones` and `/observatory/voyager`. Professor Ribbit is an original SVG character in `public/images/observatory/`. His animation uses only transforms/opacity and becomes static with reduced motion; the link disables route prefetch.

The homepage does not import the lab clients or their data. Each client fetches its prepared example only after its own page opens. No live model service, user upload, account, or external API key is required.

## Cone example

- `public/labs/cones/ngc1068.json`: matched 128 × 128 input, model mask, classical mask, source identities, and preparation notes.
- `public/labs/cones/ngc1068.webp`: lossless display of the same input grid.
- `public/labs/cones/reproduce.py`: a standard-library script that reproduces the frozen model/classical IoU from the downloaded JSON.
- `scripts/prepare_cone_lab.py`: the local research-to-web export. It reads the saved NGC 1068 inputs and an explicitly selected checkpoint, performs one CPU inference, and writes only the chosen website export directory. It does not train or modify the research repository.

To regenerate from the existing research checkout, use that checkout’s Python environment:

```sh
PYTHONDONTWRITEBYTECODE=1 /path/to/IonizationCone-Automation/venv/bin/python scripts/prepare_cone_lab.py --repo /path/to/IonizationCone-Automation --output public/labs/cones
```

The checkpoint associated with the historical saved NGC 1068 figure was not recorded. This export is a **fresh inference from the explicitly named May 13 checkpoint**, with exact source/checkpoint hashes; it is not represented as a verified reproduction of the historical poster result. Its input is HST F502N/[O III] continuum-subtracted with F547M, not a JWST F187N example.

Both interaction modes generate a binary region on that same grid:

- Paint mode supports a mouse, touch, and keyboard cursor.
- Geometry mode constructs a symmetric projected 2D bicone. Axis angle is counterclockwise from the image’s rightward horizontal axis; the displayed Y coordinate increases downward. Opening is the **full projected angle**, and extent is a pixel radius. This is an image tracing tool, not an intrinsic 3D opening-angle measurement.

Scoring shows visitor/model, visitor/literature, and model/literature intersection-over-union. It is **agreement, not observational accuracy**: visible-emission segmentation and geometric support are different targets. The optional purple mask is a classical extraction, not independent ground truth. The all-empty convention is IoU = 1; the explicit “no cone” choice permits an intentional empty prediction.

### Published geometric reference

[Das et al. (2006), Sections 2/4 and Table 2](https://arxiv.org/pdf/astro-ph/0603803) supply a kinematic bicone fit: PA 30 ± 2° east of north, inner/outer half-openings 20 ± 2° and 40 ± 2°, tilt 5 ± 2° from the sky plane (NE nearer), and axial extent 400 ± 16 pc per lobe. These are intrinsic 3D model parameters, not an HST brightness contour or a direct torus measurement.

`scripts/prepare_cone_literature.py` projects the finite cone using its apex and circular end ring, rather than an arbitrary circular radial cutoff. The orthographic outer envelope has full angular width `2 asin(sin(40°)/cos(5°)) = 80.3678°`. Solid green outlines show the projected outer footprint; dashed inner-wall guides do **not** remove an empty 2D wedge. A hollow 3D shell can project onto the central sky axis. Overlap uses the full outer footprint clipped to the image. This is geometric support, not predicted emission intensity.

The paper adopts 14.4 Mpc and states a rounded scale of 72 pc/arcsec. We use its stated 72 pc/arcsec to project its axial length, retaining the distinction from the exact small-angle conversion of 14.4 Mpc (~69.81 pc/arcsec).

Registration reconstructs the saved 400-pixel continuum-subtracted map from the two source FITS files and requires exact pixel equality. The F547M smoothed peak is a **hotspot proxy**, shifted 0.02″ west and 0.13″ south using the paper’s relative hidden-nucleus offset. Celestial FITS WCS maps the sky geometry through both crops, endpoint-aligned SciPy resampling, and the display’s vertical flip. Zero-indexed pixel centers are rendered with a half-pixel canvas offset. The WCS/header, full-image crop origin, nucleus coordinates, source hashes, projection, and masks travel with the JSON.

The FITS frame (FK5, J2000), equinox, asinh preprocessing, and frozen lab input are also verified or recorded; coordinates must retain their frame rather than silently treating them as ICRS. The hotspot identification remains an assumption; this is not an empirical astrometric registration. The optional yellow outlines shift the center by ±0.10″ along E/N, using the paper’s quoted relative-offset uncertainty as a sensitivity check, not a confidence region or propagated fit uncertainty. Scores use the adopted center. No angle uncertainties are propagated. No training, fitting, or research files are changed.

The main export automatically adds this reference. To refresh only the literature overlay without rerunning inference:

```sh
PYTHONDONTWRITEBYTECODE=1 /path/to/IonizationCone-Automation/venv/bin/python scripts/prepare_cone_literature.py --repo /path/to/IonizationCone-Automation
```

The downloadable standard-library `reproduce.py` checks both stored IoUs, independently reconstructs the literature mask from its projected polygons, and recomputes the projected opening. Full FITS/WCS regeneration uses the local export script and research environment.

Run `scripts/test_cone_literature.py -v` in that environment to check the footprint against an independent analytic line-of-sight/cone intersection calculation, celestial registration/compass, and the projected hollow-shell interpretation.

## Voyager example

The source collection is the public Breakthrough Listen Voyager archive at `https://bldata.berkeley.edu/voyager_2020/`. The lab uses compact prepared cutouts rather than asking a browser to download full HDF5 files. Source URLs, native sampling, time/frequency axes, preparation, and interpretation limits travel with the exported data in `public/labs/voyager/waterfalls.json`.

The carrier reference is a guided known-source comparison, not a blind technosignature detector. Native mid-resolution channels cannot support the fine-resolution drift precision. Display contrast does not rerun a search or alter observations. The source-matched single scan is not an ON/OFF validation; the linked Colab tutorial covers the cadence and more complete workflow.

The paired scan starts at MJD 59046.92634259259 (2020-07-16 22:13:56 UTC). Fine now covers **16,384 native spectral channels**, a 32× wider search field than the original 512-channel crop, across all 16 integrations (2.7939677 Hz, 18.253611 s). The carrier lies around 35% of the frequency window rather than its center; real neighboring features make the search less obvious. The original 512-channel linear-power data, physical axes, and guided reference were verified to match exactly inside the new cutout. Mid remains 57 native channels and every fourth integration (2861.02295 Hz native channel width, 1.073741824 s native integration, 4.294967296 s displayed sample spacing).

The browser shows up to 256 frequency bins, taking the **maximum** prepared native sample per bin at each time. This keeps narrow real features from disappearing under image downsampling. It is a display overview, not averaged power or a new native spectral resolution; fine drift is unresolved in the broad view. Both resolutions have a logarithmic **Frequency zoom** slider: fine reaches 64 native channels (256×), and mid reaches 4 native channels (~14.3×). Zoom centers on the current pick, or the viewport center before a pick. **Frequency position** pans across the complete prepared band while zoomed; **Show full field** restores the complete band. Frequency axes and channel-selection limits follow the viewport. Mid zoom enlarges native coarse channels without resolving sub-channel drift.

Each mode preserves its own zoom, position, and choice when switching resolutions. Zoom/pan/full-field inspection keep the choice and revealed answer; scoring retains the display-bin tolerance recorded at selection time. Reset returns only the active mode to its full field and clears its choice. The optional fine hint discloses the expected frequency; it is hidden initially and after fine reset. No artificial noise, extra signals, attenuation, or spectral interpolation is introduced. Contrast remains a color-only control. The native NPZ and normalized native JSON pixels remain downloadable.

Fine feedback allows a distance of one display bin at **selection time**, recorded in native-channel units. It therefore remains fair when selecting a coarse overview bin and does not change if the visitor expands the view after reveal. Mid still requires the actual carrier channel. Reset restores the full fine field and hides the hint; resolution switches preserve each choice.

`fine-cutout.npz` and `mid-cutout.npz` preserve compact linear-power arrays, frequency/time axes, and guided reference indices. `public/labs/voyager/reproduce.py` checks their float32 sample hashes and reconstructs every prepared display pixel and reference column with NumPy. Hashes describe little-endian float32 array bytes, not the NPZ archive container. The bright mid-resolution sidebands are not the carrier; its expected frequency is about 8419.5427 MHz, within the channel centered at 8419.541358947754 MHz.

To re-extract from the public files, use `scripts/prepare_voyager_lab.py --output public/labs/voyager` in a research Python environment with `numpy`, `h5py`, `fsspec[http]`, and `bitshuffle`. It uses bounded HTTP range reads of the native compressed chunks, not a full-file download. Full native fine data are about 57 GB; regeneration still transfers tens of MB of compressed chunks. The website has no Python or HDF5 dependency at runtime.

The default fine width is 16,384 channels with `--fine-carrier-fraction .35`. `--mode fine --output /tmp/new-fine-example` can prepare a single-mode staging export; merge it with the unchanged paired mid snapshot before using it on the website, which requires both modes.

## Updating the experience

Keep each input paired with its model output and preserve the same display transform for both. Export actual model outputs, not hand-drawn substitutes. Record any threshold, preprocessing, band, sample selection, or checkpoint change. Retain the distinction between observation, synthetic training target, classical extraction, and model prediction.

Run `npm run check` after changes. Check painting, geometry sliders, reset/reveal, both resolution modes, mobile tap/keyboard access, data downloads, and the absence of lab-data requests on the homepage.
