#!/usr/bin/env python3
"""Export one matched observation/prediction without modifying research artifacts."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import zoom
import torch

parser = argparse.ArgumentParser()
parser.add_argument('--repo', type=Path, required=True)
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args()
repo = args.repo.resolve()
snapshot = repo / 'saved_runs/ngc1068_20260514'
weights = (snapshot / 'data_links/run_20260513_064046_best.pth.link').resolve()
input_path = (snapshot / 'data_links/emission_map_asinh.npy').resolve()
reference_path = (snapshot / 'data_links/soft_mask.npy').resolve()
params_path = repo / 'data/2d/ngc1068_two_component/cone_params.json'
model_source = snapshot / 'source/model_2d.py'

spec = importlib.util.spec_from_file_location('frozen_cone_model', model_source)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
torch.set_num_threads(2)
model = module.UNet(in_channels=1, out_channels=1)
model.load_state_dict(torch.load(weights, map_location='cpu', weights_only=True))
model.eval()
image = np.clip(np.load(input_path).astype(np.float32), 0, 1)
params = json.loads(params_path.read_text())
if 'nucleus_cx' in params and 'nucleus_cy' in params:
    cx, cy = int(params['nucleus_cx']), int(params['nucleus_cy'])
else:
    cy, cx = np.unravel_index(np.argmax(image), image.shape)
y0, y1 = max(0, cy - 110), min(image.shape[0], cy + 110)
x0, x1 = max(0, cx - 110), min(image.shape[1], cx + 110)
crop = image[y0:y1, x0:x1]
size = 128
processed = zoom(crop, (size / crop.shape[0], size / crop.shape[1]), order=1).astype(np.float32)
with torch.inference_mode():
    probability = torch.sigmoid(model(torch.from_numpy(processed)[None, None]))[0, 0].numpy()
model_mask = probability > .5
reference = np.load(reference_path)[y0:y1, x0:x1]
reference = zoom(reference.astype(np.float32), (size / reference.shape[0], size / reference.shape[1]), order=1) > .5
intersection = int(np.logical_and(model_mask, reference).sum())
union = int(np.logical_or(model_mask, reference).sum())
# Match the origin='lower' orientation of the original scientific figures.
processed, model_mask, reference = [np.flipud(a) for a in (processed, model_mask, reference)]
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
source_files = {str(p.relative_to(repo)): sha(p) for p in [input_path, reference_path, model_source, weights, params_path]}
output = args.output
output.mkdir(parents=True, exist_ok=True)
Image.fromarray(np.rint(processed * 255).astype('uint8')).save(output / 'ngc1068.webp', lossless=True)
case = {
    'id': 'ngc1068', 'title': 'NGC 1068', 'kind': 'Observed galaxy',
    'band': 'HST WFPC2 F502N / [O III], continuum-subtracted with F547M',
    'width': size, 'height': size, 'imageUrl': '/labs/cones/ngc1068.webp',
    'modelMask': model_mask.astype('uint8').ravel().tolist(),
    'referenceMask': reference.astype('uint8').ravel().tolist(),
    'referenceLabel': 'Classical extraction; not an independent ground truth',
    'input': np.round(processed, 6).ravel().tolist(),
    'threshold': .5,
    'expectedModelReferenceIoU': intersection / union if union else 1,
    'source': {
        'projectUrl': 'https://github.com/2xwlll/IonizationCone-Automation',
        'observationUrl': 'https://mast.stsci.edu/',
        'observationId': 'hst_5754_01_wfpc2_pc_f502n_u2m301_drz',
        'checkpoint': str(weights.relative_to(repo)),
        'sha256': source_files,
        'crop': {'x0': x0, 'x1': x1, 'y0': y0, 'y1': y1},
        'display': '128x128 grid; source preprocessing clips the asinh map to [0,1], crops around the nucleus and linearly resamples. Display rows are flipped vertically to match origin=lower.',
        'inference': 'Fresh CPU float32 inference from the explicitly named checkpoint; threshold > 0.5. Frozen prediction, not live browser inference.',
        'limits': 'The checkpoint used by the historical saved prediction was not recorded. This export does not claim to reproduce that historical result. Agreement with the model or classical extraction is not observational accuracy.'
    }
}
(output / 'ngc1068.json').write_text(json.dumps(case, separators=(',', ':')))
print(json.dumps({'case': case['id'], 'grid': [size, size], 'predictedPixels': int(model_mask.sum()), 'modelVsClassicalIoU': case['expectedModelReferenceIoU'], 'jsonBytes': (output / 'ngc1068.json').stat().st_size}))
