#!/usr/bin/env python3
"""Read bounded public HDF5 cutouts. Requires numpy, h5py, fsspec[http], bitshuffle.
No full observation is downloaded. Fine extraction still reads its compressed
HDF5 chunks (roughly tens of MB). Run with --output public/labs/voyager.
"""
import json,hashlib,datetime,os,argparse
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('--output',type=Path,required=True)
args=parser.parse_args()
args.output.mkdir(parents=True,exist_ok=True)
import numpy as np,h5py,fsspec,bitshuffle.h5
BASE='https://bldata.berkeley.edu/voyager_2020/'
FILES={
'mid':BASE+'single_node_mid_res/blc23_guppi_59046_80036_DIAG_VOYAGER-1_0011.rawspec.0002.h5',
'fine':BASE+'spliced_blc00010203040506o7o0111213141516o7o021222324252627_guppi_59046_80036_DIAG_VOYAGER-1_0011.rawspec.0000.h5'}
EXPECTED=8419.5427
out={'title':'Voyager 1: two native spectral resolutions','observationMjd':59046.92634259259,'exportedUtc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'expectedCarrierMHz':EXPECTED,'datasets':{}}
for mode in ['fine','mid']:
 print('Opening',mode,flush=True)
 url=FILES[mode]
 with fsspec.open(url,'rb',block_size=65536,cache_type='none') as remote:
  with h5py.File(remote,'r') as h:
   d=h['data'];attrs={k:str(v) for k,v in d.attrs.items()}
   fch1=float(d.attrs['fch1']);foff=float(d.attrs['foff']);tsamp=float(d.attrs['tsamp']);tstart=float(d.attrs['tstart'])
   assert abs(tstart-out['observationMjd'])<1e-9, 'Source observations are not paired'
   center=round((EXPECTED-fch1)/foff)
   width=512 if mode=='fine' else 57
   lo=center-width//2;hi=lo+width
   rows=np.arange(d.shape[0]) if mode=='fine' else np.arange(0,d.shape[0],4)
   # Preserve native channels and native integrations. Mid rows are sampled,
   # not averaged, so the export makes no false claim of native time binning.
   data=[]
   for number,row in enumerate(rows):
    data.append(d[int(row),0,lo:hi])
    if number%10==0:print(mode,number+1,'/',len(rows),flush=True)
   a=np.asarray(data,dtype=np.float64)[:,::-1]
   frequencies=(fch1+np.arange(lo,hi)*foff)[::-1]
   times=(rows+0.5)*tsamp
   # Common transparent display normalization: dB power minus each row's
   # median, then robust global clipping. No denoising or injected signal.
   db=10*np.log10(np.maximum(a,np.finfo(float).tiny))
   centered=db-np.median(db,axis=1,keepdims=True)
   low,high=np.percentile(centered,[1,99.7])
   pixels=np.rint(np.clip((centered-low)/(high-low),0,1)*255).astype(np.uint8)
   if mode=='fine':
    allowed=np.where(np.abs(frequencies-EXPECTED)<=0.0003)[0]
    refs=allowed[np.argmax(a[:,allowed],axis=1)]
   else:refs=np.full(len(rows),np.argmin(np.abs(frequencies-EXPECTED)))
   result={'label':'Fine resolution' if mode=='fine' else 'Mid resolution','width':int(width),'height':int(len(rows)),'pixels':pixels.ravel().tolist(),'timeSeconds':times.tolist(),'frequencyMHz':frequencies.tolist(),'nativeFrequencyResolutionHz':abs(foff)*1e6,'nativeTimeResolutionSeconds':tsamp,'displayTimeStepSeconds':float(np.median(np.diff(times))),'referenceColumns':refs.astype(int).tolist(),'sourceUrl':url,'fileName':url.rsplit('/',1)[1],'sourceFileBytes':int(remote.size),'sourceMjd':tstart,'nativeShape':list(d.shape),'sourceRows':rows.tolist(),'sourceChannelRange':[int(lo),int(hi)],'rawCutoutSha256':hashlib.sha256(a.astype('<f4').tobytes()).hexdigest(),'preprocessing':'Reverse descending source frequency axis; display 10*log10(power) minus median of each selected row; clip the global 1st–99.7th percentile range and quantize to 8-bit. No injected signals, smoothing, or spectral interpolation.','displayDbRange':[float(low),float(high)],'limits':('All 16 native fine integrations are shown. The reference follows the strongest native channel within ±300 Hz of the tutorial’s expected carrier frequency; this is a guided carrier reference, not a blind identification.' if mode=='fine' else 'One in every four native mid-resolution integrations is displayed to keep this browser cutout small. Spectral columns remain native. Reference is the native channel nearest the tutorial’s expected carrier frequency; drift within that channel is unresolved.'),'referenceMethod':'Strongest power within ±300 Hz of expected frequency per displayed row' if mode=='fine' else 'Native frequency channel nearest expected carrier frequency'}
   result['rawCutoutHashEncoding']='SHA-256 of row-major little-endian float32 linear-power sample bytes, not the NPZ container file.'
   out['datasets'][mode]=result
   np.savez(args.output / (mode+'-cutout.npz'),power=a,frequencyMHz=frequencies,timeSeconds=times,referenceColumns=refs)

   print(mode,'done',width,len(rows),'peaks',result['referenceColumns'][:8],'db',result['displayDbRange'],flush=True)
assert set(out['datasets']) == {'fine','mid'}
output=args.output / 'waterfalls.json'
output.write_text(json.dumps(out,separators=(',',':')))
print('Wrote', output, output.stat().st_size, flush=True)
