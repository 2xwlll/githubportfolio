#!/usr/bin/env python3
"""Reproduce the prepared display and reference from the downloaded cutouts.

Requires NumPy. Put waterfalls.json, fine-cutout.npz and mid-cutout.npz beside
this script, then run: python reproduce.py
This does not download the original multi-gigabyte HDF5 observations.
"""
import hashlib
import json
from pathlib import Path
import numpy as np

root = Path(__file__).resolve().parent
example = json.loads((root / 'waterfalls.json').read_text())
for mode, metadata in example['datasets'].items():
    with np.load(root / f'{mode}-cutout.npz', allow_pickle=False) as saved:
        power = saved['power']
        frequencies = saved['frequencyMHz']
        times = saved['timeSeconds']
    digest = hashlib.sha256(power.astype('<f4').tobytes(order='C')).hexdigest()
    assert digest == metadata['rawCutoutSha256'], 'Linear-power sample hash differs'
    assert power.shape == (metadata['height'], metadata['width'])
    assert np.array_equal(frequencies, metadata['frequencyMHz'])
    assert np.array_equal(times, metadata['timeSeconds'])
    db = 10 * np.log10(np.maximum(power, np.finfo(float).tiny))
    centered = db - np.median(db, axis=1, keepdims=True)
    low, high = np.percentile(centered, [1, 99.7])
    display = np.rint(np.clip((centered - low) / (high - low), 0, 1) * 255).astype(np.uint8)
    assert np.array_equal(display.ravel(), metadata['pixels']), 'Display samples differ'
    if mode == 'fine':
        allowed = np.where(np.abs(frequencies - example['expectedCarrierMHz']) <= .0003)[0]
        reference = allowed[np.argmax(power[:, allowed], axis=1)]
    else:
        reference = np.full(power.shape[0], np.argmin(np.abs(frequencies - example['expectedCarrierMHz'])))
    assert np.array_equal(reference, metadata['referenceColumns']), 'Guided reference differs'
    print(f'{mode}: sample hash, physical axes, display values, and guided carrier reference match.')
print('The fine reference uses a known-carrier window. The mid reference is the nearest native channel.')
print('This verifies the frozen preparation, not a blind detection or survey sensitivity.')
