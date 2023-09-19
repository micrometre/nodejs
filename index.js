const http = require('http');
const fs = require('fs');

function reqListener(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === '/video') {
    var path = 'alprVideo.mp4';
    var file = fs.createReadStream(path);
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    file.pipe(res);
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    })

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

}

const server = http.createServer(reqListener)

server.listen(5000);