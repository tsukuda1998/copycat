const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  let extname = path.extname(filePath);

  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;

    case '.css':
      contentType = 'text/css';
      break;

    case '.json':
      contentType = 'application/json';
      break;

    case '.png':
      contentType = 'image/png';
      break;

    case '.jpg':
      contentType = 'image/jpg';
      break;

    case '.ico':
      contentType = 'image/x-icon';
      break;
  }


  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {

        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');

        });
      } else {

        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);

      }
    } else {
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(contentType.startsWith('text/') ? content : Buffer.from(content));

    }
  });
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





