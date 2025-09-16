const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const port = 3000;
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  
  // Обработка корневого пути
  if (pathname === '/') pathname = '/index.html';
  
  // Обработка папок /terms и /privacy
  if (pathname === '/terms' || pathname === '/terms/') pathname = '/terms/index.html';
  if (pathname === '/privacy' || pathname === '/privacy/') pathname = '/privacy/index.html';
  
  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'text/plain';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});