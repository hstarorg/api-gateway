module.exports = {
  priority: 5,
  name: 'response-time',
  description: '',
  handler: async (ctx, next) => {
    const startAt = process.uptime();
    await next();
    const endAt = process.uptime();
    const diffMs = (endAt - startAt) * 1000;
    ctx.set('X-Response-Time', `${diffMs}ms`);
  }
};
