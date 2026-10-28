const fs = require('fs');
const path = require('path');

const cakeData = fs.readFileSync(path.resolve(__dirname, '../src/data/cakeData.js'), 'utf8');
const publicDir = path.resolve(__dirname, '../public');

const regex = /"(\/(cakes images|background images|custom cakes)\/[^"]+\.(png|jpg))"/g;
let match;
const missing = [];
let total = 0;

while ((match = regex.exec(cakeData)) !== null) {
  total++;
  const orig = match[1];
  const webpRel = orig.replace(/\.(png|jpg)$/, '.webp');
  const diskPath = path.join(publicDir, decodeURIComponent(webpRel.replace(/^\//, '')));
  if (!fs.existsSync(diskPath)) {
    missing.push({ orig, diskPath });
  }
}

console.log('Total checked:', total);
console.log('Missing count:', missing.length);
if (missing.length > 0) {
  console.log('Missing files:', missing);
} else {
  console.log('All image paths have matching WebP files!');
}
