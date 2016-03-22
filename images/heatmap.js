var Canvas = require('canvas');
var Image = Canvas.Image;


// Constants
var canvasWidth = 350;
var canvasHeight = 150;
var cellSize = 30;
var colorMap = {
  0: 'rgba(0, 0, 0, 0)',
  1: '#F7F6EA',
  2: '#E6E6E1',
  3: '#EBC000'
};


module.exports = generate;


function generate(title, accuracy) {
  var canvas = new Canvas(canvasWidth, canvasHeight);
  var ctx = canvas.getContext('2d');

  drawTitle(ctx, title);
  drawAccuracy(ctx, accuracy);
  drawAccuracySub(ctx);
  drawHeatMap(ctx);

  return canvas.toBuffer();
};


function drawHeatMap(ctx) {
  var grid = [
    [ 1, 3, 3, 2 ],
    [ 0, 1, 2, 1 ],
    [ 0, 2, 3, 1 ]
  ];

  var y = 60;
  grid.forEach(function(r) {
    var x = canvasWidth - cellSize;
    r.reverse().forEach(function(c, j) {
      drawCell(ctx, x - (j * 2), y, colorMap[c]);
      x -= cellSize;
    });
    y += cellSize;
  });
}

function drawCell(ctx, x, y, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, cellSize, cellSize);
}

function drawTitle(ctx, title) {
  //var title = 'Profit and Discount drives sales with a';

  ctx.font = '14px Kozuka Gothic Pro';
  ctx.fillText(title, 20, 30);
}

function drawAccuracy(ctx, accuracy) {
  accuracy += '%';

  ctx.font = '60px Kozuka Gothic Pro';

  ctx.fillText(accuracy, 20, 100);
}

function drawAccuracySub(ctx) {
  var sub = 'driver strength';
  ctx.font = '14px Kozuka Gothic Pro';

  ctx.fillText(sub, 20, 125);
}

