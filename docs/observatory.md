# After-hours observatory

The public entry point is `/observatory`, linked by **After hours** in the footer. The interactive pages are `/observatory/cones` and `/observatory/voyager`. Professor Ribbit is an original SVG character in `public/images/observatory/`.

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

Scoring is visitor/model intersection-over-union. It is **agreement, not observational accuracy**. The optional purple mask is a classical extraction, not independent ground truth. The all-empty convention is IoU = 1; the explicit “no cone” choice permits an intentional empty prediction.

## Voyager example

The source collection is the public Breakthrough Listen Voyager archive at `https://bldata.berkeley.edu/voyager_2020/`. The lab uses compact prepared cutouts rather than asking a browser to download full HDF5 files. Source URLs, native sampling, time/frequency axes, preparation, and interpretation limits travel with the exported data in `public/labs/voyager/waterfalls.json`.

The carrier reference is a guided known-source comparison, not a blind technosignature detector. Native mid-resolution channels cannot support the fine-resolution drift precision. Display contrast does not rerun a search or alter observations. The source-matched single scan is not an ON/OFF validation; the linked Colab tutorial covers the cadence and more complete workflow.

The paired scan starts at MJD 59046.92634259259 (2020-07-16 22:13:56 UTC). Fine shows 512 native spectral channels across all 16 integrations (2.7939677 Hz, 18.253611 s). Mid shows 57 native channels and every fourth integration (2861.02295 Hz native channel width, 1.073741824 s native integration, 4.294967296 s displayed sample spacing). The windows have different frequency spans.

`fine-cutout.npz` and `mid-cutout.npz` preserve compact linear-power arrays, frequency/time axes, and guided reference indices. `public/labs/voyager/reproduce.py` checks their float32 sample hashes and reconstructs every prepared display pixel and reference column with NumPy. Hashes describe little-endian float32 array bytes, not the NPZ archive container. The bright mid-resolution sidebands are not the carrier; its expected frequency is about 8419.5427 MHz, within the channel centered at 8419.541358947754 MHz.

To re-extract from the public files, use `scripts/prepare_voyager_lab.py --output public/labs/voyager` in a research Python environment with `numpy`, `h5py`, `fsspec[http]`, and `bitshuffle`. It uses bounded HTTP range reads of the native compressed chunks, not a full-file download. Full native fine data are about 57 GB; regeneration still transfers tens of MB of compressed chunks. The website has no Python or HDF5 dependency at runtime.

## Updating the experience

Keep each input paired with its model output and preserve the same display transform for both. Export actual model outputs, not hand-drawn substitutes. Record any threshold, preprocessing, band, sample selection, or checkpoint change. Retain the distinction between observation, synthetic training target, classical extraction, and model prediction.

Run `npm run check` after changes. Check painting, geometry sliders, reset/reveal, both resolution modes, mobile tap/keyboard access, data downloads, and the absence of lab-data requests on the homepage.
