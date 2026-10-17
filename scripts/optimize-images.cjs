const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');

async function processDirectory(dirPath, options) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'thumbs') {
        await processDirectory(fullPath, options);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext) && !entry.name.endsWith('.webp')) {
        const baseName = path.basename(entry.name, ext);
        const outPath = path.join(dirPath, baseName + '.webp');
        
        let pipeline = sharp(fullPath);
        if (options.maxWidth) {
          pipeline = pipeline.resize({ width: options.maxWidth, withoutEnlargement: true });
        }
        await pipeline.webp({ quality: options.quality || 86, effort: 6 }).toFile(outPath);
        
        const origSize = fs.statSync(fullPath).size;
        const newSize = fs.statSync(outPath).size;
        const pct = ((1 - newSize / origSize) * 100).toFixed(1);
        console.log(`${entry.name} -> ${baseName}.webp: ${(origSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${pct}%)`);
      }
    }
  }
}

async function run() {
  console.log('--- Processing Cakes Images ---');
  await processDirectory(path.join(publicDir, 'cakes images'), { maxWidth: 1100, quality: 88 });
  
  console.log('\n--- Processing Background Images ---');
  await processDirectory(path.join(publicDir, 'background images'), { maxWidth: 1600, quality: 82 });

  console.log('\n--- Processing Custom Cakes ---');
  await processDirectory(path.join(publicDir, 'custom cakes'), { maxWidth: 800, quality: 85 });

  console.log('\n--- Processing Root Logos ---');
  const rootLogos = ['logo.png', 'logo-emblem.png', 'logo-gold.png', 'logo-white.png'];
  for (const logo of rootLogos) {
    const p = path.join(publicDir, logo);
    if (fs.existsSync(p)) {
      const base = path.basename(logo, '.png');
      const out = path.join(publicDir, base + '.webp');
      await sharp(p).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 90, effort: 6 }).toFile(out);
      const origSize = fs.statSync(p).size;
      const newSize = fs.statSync(out).size;
      const pct = ((1 - newSize / origSize) * 100).toFixed(1);
      console.log(`${logo} -> ${base}.webp: ${(origSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${pct}%)`);
    }
  }

  console.log('\n--- Generating Hero Flavour Thumbnails ---');
  const thumbsDir = path.join(publicDir, 'cakes images', 'thumbs');
  if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });
  const flavours = [
    { name: 'chocolate', src: 'chocolate.png' },
    { name: 'butterscotch', src: 'Butterscotch.png' },
    { name: 'strawberry', src: 'Strawberry.png' },
    { name: 'blueberry', src: 'blueberry.png' },
    { name: 'vanilla', src: 'Vanilla.png' }
  ];
  for (const flv of flavours) {
    const src = path.join(publicDir, 'cakes images', flv.src);
    if (fs.existsSync(src)) {
      const out = path.join(thumbsDir, flv.name + '.webp');
      await sharp(src).resize({ width: 100, height: 100, fit: 'cover' }).webp({ quality: 80, effort: 6 }).toFile(out);
      console.log(`Thumb created for ${flv.name}: ${(fs.statSync(out).size / 1024).toFixed(1)}KB`);
    }
  }

  console.log('\nImage optimization finished successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
