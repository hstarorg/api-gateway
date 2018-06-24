module.exports = {
  priority: 10,
  name: 'global-error-handler',
  description: '',
  handler: async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.throw(e, e.status || 500);
    }
  }
};
