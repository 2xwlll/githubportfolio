export const voyagerTutorial = "https://colab.research.google.com/drive/1wOC0SfRIm4v8qT7pGF8FS6o_ko7tY3RO#scrollTo=midres-000";

export function maskAgreement(a: Uint8Array | number[], b: Uint8Array | number[], valid?: number[]) {
  if (a.length !== b.length) throw new Error("Masks must share a pixel grid.");
  let intersection = 0, union = 0, aPixels = 0, bPixels = 0;
  for (let i = 0; i < a.length; i++) {
    if (valid && !valid[i]) continue;
    const aa = a[i] > 0, bb = b[i] > 0;
    if (aa) aPixels++;
    if (bb) bPixels++;
    if (aa && bb) intersection++;
    if (aa || bb) union++;
  }
  return { iou: union ? intersection / union : 1, intersection, union, aPixels, bPixels };
}

export function paintDisc(mask: Uint8Array, width: number, height: number, x: number, y: number, radius: number, value: number) {
  for (let yy = Math.max(0, Math.floor(y - radius)); yy <= Math.min(height - 1, Math.ceil(y + radius)); yy++) {
    for (let xx = Math.max(0, Math.floor(x - radius)); xx <= Math.min(width - 1, Math.ceil(x + radius)); xx++) {
      if ((xx - x) ** 2 + (yy - y) ** 2 <= radius ** 2) mask[yy * width + xx] = value;
    }
  }
}

export type ConeGeometry = { cx: number; cy: number; axis: number; opening: number; extent: number };

export function projectedBicone(width: number, height: number, geometry: ConeGeometry) {
  const mask = new Uint8Array(width * height);
  const angle = geometry.axis * Math.PI / 180;
  const limit = Math.cos(geometry.opening * Math.PI / 360);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const dx = x - geometry.cx, dy = geometry.cy - y;
    const radius = Math.hypot(dx, dy);
    if (radius <= geometry.extent && (radius === 0 || Math.abs(dx * Math.cos(angle) + dy * Math.sin(angle)) / radius >= limit)) mask[y * width + x] = 1;
  }
  return mask;
}
