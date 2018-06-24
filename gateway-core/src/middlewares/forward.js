const request = require('request');

module.exports = {
  priority: 25,
  name: 'forward',
  description: '',
  handler: async (ctx, next) => {
    const forwardInfo = ctx.state.$$gateway.forwardInfo;
    const reqOptions = {
      method: ctx.method.toLowerCase(),
      headers: ctx.headers,
      uri: `http://${forwardInfo.host}/${forwardInfo.path}`,
      timeout: 1000 * 60
    };
    const resData = [];
    let resLength = 0;
    const proxyReq = request(reqOptions);
    if (reqOptions.method === 'post' || reqOptions.method === 'put') {
      // 将请求数据转发给proxyReq
      ctx.req.pipe(proxyReq);
      // 记录请求数据
      ctx.req.on('data', chunk => {
        if (!ctx.state.$$gateway.requestData) {
          ctx.state.$$gateway.requestData = chunk;
        } else {
          ctx.state.$$gateway.requestData += chunk;
        }
      });
    }
    await new Promise(resolve => {
      proxyReq.pipe(ctx.res);
      // 处理错误
      proxyReq.on('error', err => {
        ctx.body = err.message;
        resolve();
      });
      // 记录响应数据
      proxyReq.on('data', data => {
        resData.push(data);
        resLength += data.length;
      });
      // 接受响应时，记录状态码和响应头
      proxyReq.on('response', res => {
        ctx.state.$$gateway.responseStatusCode = res.statusCode;
        ctx.state.$$gateway.responseHeaders = res.headers;
      });
      // 请求完成后保存响应数据
      proxyReq.on('end', () => {
        if (resData.length > 0) {
          ctx.state.$$gateway.responseData = Buffer.concat(resData, resLength).toString();
        }
        console.log(ctx.state.$$gateway.responseData, ctx.state.$$gateway.responseHeaders);
        resolve();
      });
    });
  }
};
