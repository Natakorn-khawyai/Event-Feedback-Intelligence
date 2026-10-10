const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'images');
const pngPath = path.join(imgDir, 'Presentation Deck โปรเจกต์ฟีดแบ็ก.png');

if (!fs.existsSync(pngPath)) {
  console.error('File not found:', pngPath);
  process.exit(1);
}

const pngBytes = fs.readFileSync(pngPath);
const width = pngBytes.readUInt32BE(16);
const height = pngBytes.readUInt32BE(20);
const base64Str = pngBytes.toString('base64');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
  <image width="${width}" height="${height}" href="data:image/png;base64,${base64Str}"/>
</svg>
`;

// 1. Output as Presentation Deck โปรเจกต์ฟีดแบ็ก.svg
fs.writeFileSync(path.join(imgDir, 'Presentation Deck โปรเจกต์ฟีดแบ็ก.svg'), svgContent, 'utf8');

// 2. Output as presentation-deck-mascot.svg (clean ascii filename)
fs.writeFileSync(path.join(imgDir, 'presentation-deck-mascot.svg'), svgContent, 'utf8');

// 3. Update cute-waiting-mascot.svg so the web app displays it immediately
fs.writeFileSync(path.join(imgDir, 'cute-waiting-mascot.svg'), svgContent, 'utf8');

console.log('✅ Generated SVG files successfully:');
console.log(' - public/images/Presentation Deck โปรเจกต์ฟีดแบ็ก.svg');
console.log(' - public/images/presentation-deck-mascot.svg');
console.log(' - public/images/cute-waiting-mascot.svg');
