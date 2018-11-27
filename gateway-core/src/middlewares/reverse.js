const request = require('request');
const config = require('../config');
const rawBody = require('raw-body');

function _setResponseTime(ctx) {
  const endAt = process.uptime();
  const diffMs = (endAt - ctx.state.$$gateway.startAt) * 1000;
  ctx.set('X-Response-Time', `${diffMs.toFixed(2)}ms`);
}

module.exports = {
  priority: 25,
  name: 'reverse',
  description: 'Reverse request to real address',
  handler: async (ctx, next) => {
    const forwardInfo = ctx.state.$$gateway.forwardInfo;
    const realUri = `http://${forwardInfo.host}${forwardInfo.path}`;

    // Record request headers and data
    const reqBodyStr = (await rawBody(ctx.req)).toString();
    console.log(ctx.request.headers, reqBodyStr);

    // Pipe request
    ctx.body = ctx.req.pipe(request({ method: ctx.method, url: realUri, timeout: config.reverseTimeout }));

    // Record response
    let responseData = '';
    // let responseBufferArr = [];
    ctx.body
      .on('response', res => {
        ctx.state.$$gateway.responseStatusCode = res.statusCode;
        ctx.state.$$gateway.responseHeaders = res.headers;
      })
      .on('data', data => {
        responseData += data;
        // responseBufferArr.push(data);
      })
      .on('end', () => {
        console.log(responseData);
        // const resStr = Buffer.concat(responseBufferArr, responseBufferArr.length).toString()
        // console.log(resStr);
      })
      .on('error', err => {
        console.error(err);
      });
  }
};
