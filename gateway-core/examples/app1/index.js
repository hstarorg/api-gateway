const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const resStr = JSON.stringify({
    name: 'App1',
    path: req.url
  });
  res.write(resStr);
  res.end();
});

server.listen(5001, () => {
  console.log('app1 started, port 5001');
});
