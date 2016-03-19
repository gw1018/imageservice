var http = require('http');
var url = require('url');
var image = require('./image');

var server = http.createServer(function(req, res) {
  var parsed = url.parse(req.url);

  if (parsed.pathname === '/generate') {
    generateImg(parsed.query, function(err, imageData) {
      if (err) {
        console.error(err.message);
        res.statusCode = 500;
        res.end();
        return;
      }

      var prefix = 'data:image/png;base64,';
      var image = prefix + imageData;

      var html = '<img src="'+ image +'">';
      res.setHeader('content-type', 'text/html');
      res.end(html);
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

function generateImg(query, cb) {
  var qs = getMapFromQueryString(query);
  var imageData;

  if (qs.image === 'spiral') {
    console.log('Rendering spiral...');

    var title = qs.title;
    var bubbles = qs.bubbles.split(',');
    imageData = image.spiral(title, bubbles);
  } else if (qs.image === 'heatmap') {
    console.log('Rendering heatmap...');

    var title = qs.title;
    var accuracy = qs.accuracy;
    imageData = image.heatmap(title, accuracy);
  } else {
    console.warn('Unspecified type...');

    cb(new Error('Unspecified type'));
  }

  cb(null, imageData.toString('base64'));
}

function getMapFromQueryString(qs) {
  var map = {};

  // [foo=bar, biz=baz]
  var split = qs.split('&').map(function(q) {
    return q.split('=');
  }).forEach(function(q) {
    map[q[0]] = decodeURIComponent(q[1]);
  });

  console.log(map);
  return map;
}

server.listen(8889);

