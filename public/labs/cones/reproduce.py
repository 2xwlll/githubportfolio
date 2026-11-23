#!/usr/bin/env python3
"""Inspect the frozen cone example with Python's standard library.

Download ngc1068.json beside this file, then run:
    python reproduce.py ngc1068.json
This reproduces the stored mask comparison, not neural-network training.
"""
import json
import math
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
literature = example['literature']
assert len(literature['mask']) == len(model)
polygons = literature['outerOutlines']


def inside_convex(x, y, polygon):
    signs = []
    for a, b in zip(polygon, polygon[1:] + polygon[:1]):
        signs.append((b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]))
    return all(s >= -1e-8 for s in signs) or all(s <= 1e-8 for s in signs)


reconstructed = [int(any(inside_convex(x, y, p) for p in polygons))
                 for y in range(example['height']) for x in range(example['width'])]
assert reconstructed == literature['mask'], 'Published footprint does not match projected polygons'
params = literature['parameters']
opening = math.degrees(2 * math.asin(math.sin(math.radians(params['outerHalfOpeningDeg'])) /
                                    math.cos(math.radians(params['inclinationFromSkyPlaneDeg']))))
assert abs(opening - literature['projectedFullOuterOpeningDeg']) < 1e-10
intersection = sum(bool(a) and bool(b) for a, b in zip(model, reconstructed))
union = sum(bool(a) or bool(b) for a, b in zip(model, reconstructed))
assert abs(intersection / union - literature['expectedModelIoU']) < 1e-12
print(f'Projected literature full opening: {opening:.8f} degrees')
print(f"Model / projected literature IoU: {literature['expectedModelIoU']:.8f}")
print('Literature geometry is a kinematic model, not emission-mask ground truth.')
print('Registration:', literature['registration']['method'])
print('Primary source:', literature['paperUrl'])
print('Checkpoint:', example['source']['checkpoint'])
print('Input and checkpoint hashes:', json.dumps(example['source']['sha256'], indent=2))
