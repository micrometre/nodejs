var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  var url = req.url;
  var path = 'alprVideo.mp4';
    var file = fs.createReadStream(path);
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    file.pipe(res);
}).listen(5000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');