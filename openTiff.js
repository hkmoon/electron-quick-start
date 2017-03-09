var fs = require('fs');
var Tiff = require('./tiff');

var filename = __dirname + "/images/lena-std.tiff";

fs.readFile(filename, function (err, data) {
  if (err) { throw err; }
  var tiff = new Tiff({buffer: data});
  console.log('width:', tiff.width());
  console.log('height:', tiff.height());
  console.log('currentDirectory:', tiff.currentDirectory());
  console.log('countDirectory:', tiff.countDirectory());

  var canvas = tiff.toCanvas();
  document.body.appendChild(canvas);

  tiff.close();
});
