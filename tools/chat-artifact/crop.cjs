#!/usr/bin/env node
/*
 * crop.cjs — auto-crop the magenta (#FF00FF) sentinel border from a rendered
 * chat artifact PNG, leaving exactly the card.
 *
 *   node crop.cjs <raw.png> <out.png>
 *
 * Pure JS (pngjs) — no native deps, no browser. See README.md §6.
 */
const fs = require('fs');
const { PNG } = require('pngjs');

const [, , src, out] = process.argv;
if (!src || !out) {
  console.error('usage: node crop.cjs <raw.png> <out.png>');
  process.exit(1);
}

const png = PNG.sync.read(fs.readFileSync(src));
const { width: W, height: H, data } = png;

// A pixel is sentinel if it is (near-)pure magenta. Tolerant of antialiasing.
const isSentinel = (r, g, b) => r > 235 && g < 45 && b > 235;

let minX = W, minY = H, maxX = -1, maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (W * y + x) << 2;
    if (!isSentinel(data[i], data[i + 1], data[i + 2])) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
if (maxX < 0) { console.error('crop.cjs: no non-sentinel content found'); process.exit(1); }

const cw = maxX - minX + 1, ch = maxY - minY + 1;
const cropped = new PNG({ width: cw, height: ch });
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const si = (W * (y + minY) + (x + minX)) << 2;
    const di = (cw * y + x) << 2;
    cropped.data[di] = data[si];
    cropped.data[di + 1] = data[si + 1];
    cropped.data[di + 2] = data[si + 2];
    cropped.data[di + 3] = 255;
  }
}
fs.writeFileSync(out, PNG.sync.write(cropped));
console.log(`crop.cjs: ${cw}x${ch} -> ${out}`);
