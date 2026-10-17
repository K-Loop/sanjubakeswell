const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../src/data/cakeData.js');
let content = fs.readFileSync(file, 'utf8');

// Replace all .png and .jpg image paths in cakes images, background images, custom cakes
content = content.replace(/"(\/(cakes images|background images|custom cakes)\/[^"]+?)\.(png|jpg)"/g, '"$1.webp"');

// Update flavour thumbs to tiny thumbnails
content = content.replace(/thumb:\s*"\/cakes images\/chocolate\.webp"/, 'thumb: "/cakes images/thumbs/chocolate.webp"');
content = content.replace(/thumb:\s*"\/cakes images\/Butterscotch\.webp"/, 'thumb: "/cakes images/thumbs/butterscotch.webp"');
content = content.replace(/thumb:\s*"\/cakes images\/Strawberry\.webp"/, 'thumb: "/cakes images/thumbs/strawberry.webp"');
content = content.replace(/thumb:\s*"\/cakes images\/blueberry\.webp"/, 'thumb: "/cakes images/thumbs/blueberry.webp"');
content = content.replace(/thumb:\s*"\/cakes images\/Vanilla\.webp"/, 'thumb: "/cakes images/thumbs/vanilla.webp"');

fs.writeFileSync(file, content, 'utf8');
console.log('cakeData.js updated successfully to .webp!');
