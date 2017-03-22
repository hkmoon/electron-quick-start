var fs = require('fs');
var Tiff = require('./tiff');

var filename = __dirname + "/images/flybrain.tiff";

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

document.body.ondrop = (ev) => {

  filename = ev.dataTransfer.files[0].path;
  console.log(filename)

  fs.readFile(filename, function (err, data) {
    if (err) { throw err; }
    tiff = new Tiff({buffer: data});
    console.log('width:', tiff.width());
    console.log('height:', tiff.height());
    console.log('currentDirectory:', tiff.currentDirectory());
    console.log('countDirectory:', tiff.countDirectory());

    document.querySelector('#slider').max = tiff.countDirectory()

    tiffUpdate(1);
  });

  ev.preventDefault()
}

fs.readFile(filename, function (err, data) {
  if (err) { throw err; }
  tiff = new Tiff({buffer: data});
  console.log('width:', tiff.width());
  console.log('height:', tiff.height());
  console.log('currentDirectory:', tiff.currentDirectory());
  console.log('countDirectory:', tiff.countDirectory());

  document.querySelector('#slider').max = tiff.countDirectory()

  tiffUpdate(1);
});

window.closed = (e) => {
  tiff.close();
}
