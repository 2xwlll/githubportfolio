#!/usr/bin/env python3
"""Inspect the frozen cone example with Python's standard library.

Download ngc1068.json beside this file, then run:
    python reproduce.py ngc1068.json
This reproduces the stored mask comparison, not neural-network training.
"""
import json
from pathlib import Path
import sys

example = json.loads(Path(sys.argv[1] if len(sys.argv) > 1 else 'ngc1068.json').read_text())
model = example['modelMask']
classical = example['referenceMask']
assert len(model) == len(classical) == example['width'] * example['height']
intersection = sum(bool(a) and bool(b) for a, b in zip(model, classical))
union = sum(bool(a) or bool(b) for a, b in zip(model, classical))
iou = intersection / union if union else 1.0
assert abs(iou - example['expectedModelReferenceIoU']) < 1e-12
print(f"Grid: {example['width']} x {example['height']}")
print(f"Model pixels: {sum(model)}")
print(f"Classical extraction pixels: {sum(classical)}")
print(f"Frozen model / classical IoU: {iou:.8f}")
print('Classical extraction is not independent ground truth.')
print('Checkpoint:', example['source']['checkpoint'])
print('Input and checkpoint hashes:', json.dumps(example['source']['sha256'], indent=2))
