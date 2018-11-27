const http = require('http');
const Koa = require('koa');

const config = require('./config');
const app = new Koa();
const middlewares = require('./middlewares');

app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    return (ctx.body = '<h1 style="text-align:center;">Welcome to API-Gateway!</h1><hr />');
  }
  await next();
});

middlewares.attach(app);

const server = http.createServer(app.callback());
server
  .listen(config.port, () => {
    const addr = server.address();
    console.log(`Gateway started...`, addr);
  })
  .on('error', err => {
    console.error(err);
  });
