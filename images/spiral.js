var Canvas = require('canvas');
var Image = Canvas.Image;

// Constants
var radius = 70;
var bubbleSize = 8;
var spiralOrigin = { x: 80, y: 130 };
var canvasWidth = 350;
var canvasHeight = 150;


function generate(title, bubbles) {
  var canvas = new Canvas(canvasWidth, canvasHeight);
  var ctx = canvas.getContext('2d');

  drawTitle(ctx, title);
  drawSpiral(ctx, radius, spiralOrigin);
  var bubbleLocs = drawBubbles(ctx, radius, spiralOrigin);
  drawBubbleTitles(ctx, bubbleLocs, bubbles);

  return canvas.toBuffer();
}


function drawTitle(ctx, title) {
  ctx.font = '20px Arial';
  drawText(ctx, title, 10, 30);
}


function drawText(ctx, text, x, y) {
  ctx.fillText(text, x, y);
}


function drawSpiral(ctx, radius, origin) {
  drawCircle(ctx, radius, origin.x, origin.y);
  drawCircle(ctx, radius - 20, origin.x, origin.y);
  drawCircle(ctx, radius - 40, origin.x, origin.y);
}


function drawCircle(ctx, r, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#4C7EBC';
  ctx.stroke();
  ctx.closePath();
}


function drawBubbles(ctx, radius, origin) {
  var loc = [];

  loc.push(drawBubble(ctx, 45, radius, origin));
  loc.push(drawBubble(ctx, 45, radius - 20, origin));
  loc.push(drawBubble(ctx, 45, radius - 40, origin));

  return loc;
}


function drawBubble(ctx, angle, r, origin) {
  var x = origin.x + r * Math.cos(angle);
  var y = origin.y - r * Math.sin(angle);

  ctx.beginPath();
  ctx.arc(x, y, bubbleSize, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#EEC034';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.closePath();

  return {
    x: x,
    y: y
  };
}


function drawBubbleTitles(ctx, bubbleLocs, bubbleTitles) {
  ctx.font = '12px Arial';
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#000000';

  var titleLinePadding = 5;
  ctx.beginPath();

  bubbleLocs.forEach(function(l, i) {
    var label = bubbleTitles[i];

    ctx.moveTo(l.x + 10, l.y);
    ctx.lineTo(l.x + (80 + i * 10) - titleLinePadding, l.y);
    ctx.stroke();
    drawText(ctx, label, l.x + (80 + i * 10), l.y + titleLinePadding);
  });
}


module.exports = generate;

