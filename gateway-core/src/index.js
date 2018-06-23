const http = require('http');
const Koa = require('koa');

const config = require('./config');
const app = new Koa();

app.use(async ctx => {
  if (ctx.path === '/') {
    ctx.body = '<h1 style="text-align:center;">Welcome to API-Gateway!</h1><hr />';
  }
});

const server = http.createServer(app.callback());
server
  .listen(config.port, () => {
    const addr = server.address();
    console.log(`Gateway started... listening port ${addr.port}`);
  })
  .on('error', err => {
    console.error(err);
  });
