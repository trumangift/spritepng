const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

module.exports = function (source) {
   const callback = this.async();
   const mathUrlReg = /url\((\S*)\?__sprite\)/g;
   const mathUrlReg2 = /url\((\S*)\?__sprite\)/;
   const imgs = source.match(mathUrlReg);
   const matchedImages = [];
   imgs.forEach(img => {
      const targetSrc = img.match(mathUrlReg2);
      matchedImages.push(targetSrc[1]);
   });
   Spritesmith.run({src: matchedImages}, function handleResult (err, result) {
      fs.writeFileSync(path.join(process.cwd(), './dist/sprite.png'), result.image);
      source = source.replace(mathUrlReg, 'url(./dist/sprite.png)');
      fs.writeFileSync(path.join(process.cwd(), './dist/index.css'),  source);
      callback(err, source);
   });
};
