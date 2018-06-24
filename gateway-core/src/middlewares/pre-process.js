module.exports = {
  priority: 0,
  name: 'pre-process',
  description: '',
  handler: async (ctx, next) => {
    ctx.state.$$gateway = {};
    await next();
  }
};
