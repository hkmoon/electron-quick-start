var fabric = require('fabric').fabric;

(function() {
  fabric.Object.prototype.transparentCorners = false;
  this.__canvases = [];

  var i, dot,
    t1, t2,
    startTimer = function() {
      t1 = new Date().getTime();
      return t1;
    },
    stopTimer = function() {
      t2 = new Date().getTime();
      return t2 - t1;
    },
    getRandomInt = fabric.util.getRandomInt,
    rainbow    = ["#ffcc66", "#ccff66", "#66ccff", "#ff6fcf", "#ff6666"],
    rainbowEnd = rainbow.length - 1;

  //
  // Rendering canvas #1
  //
  var canvas1  = new fabric.Canvas('c1', { backgroundColor: "#000" }),
      results1 = document.getElementById('results-c1');

  startTimer();
  for (i = 100; i >= 0; i--) {
    dot = new fabric.Circle({
      left:   getRandomInt(0, 400),
      top:    getRandomInt(0, 350),
      radius: 3,
      fill:   rainbow[getRandomInt(0, rainbowEnd)]
    });
    canvas1.add(dot);
  }
  results1.innerHTML = 'Regular rendering of <strong>100</strong> elements in <strong>' + stopTimer() + 'ms</strong>';
  this.__canvases.push(canvas1);

  //
  // Rendering canvas #2
  //
  var canvas2  = new fabric.Canvas('c2', { backgroundColor: "#000", renderOnAddRemove: false }),
      results2 = document.getElementById('results-c2');

  startTimer();
  for (i = 1000; i >= 0; i--) {
    dot = new fabric.Circle({
      left:   getRandomInt(0, 400),
      top:    getRandomInt(0, 350),
      radius: 3,
      fill:   rainbow[getRandomInt(0, rainbowEnd)]
    });
    canvas2.add(dot);
  }
  canvas2.renderAll(); // Note, calling renderAll() is important in this case
  results2.innerHTML = 'Rendering <strong>1000</strong> elements using <code>canvas.renderOnAddRemove = false</code> in <strong>' + stopTimer() + 'ms</strong>';
  this.__canvases.push(canvas2);
})();
