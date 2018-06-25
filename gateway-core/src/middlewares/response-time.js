module.exports = {
  priority: 5,
  name: 'response-time',
  description: '',
  handler: async (ctx, next) => {
    const startAt = process.uptime();
    ctx.state.$$gateway.startAt = startAt;
    await next();
    const endAt = process.uptime();
    const diffMs = (endAt - startAt) * 1000;
    const diffMsStr = `${diffMs.toFixed(2)}ms`;
    // ctx.set('X-Response-Time', diffMsStr);
    // ctx.res.end();
    console.log('res-end', diffMsStr);
  }
};
