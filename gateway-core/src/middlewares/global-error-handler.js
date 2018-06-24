module.exports = {
  priority: 0,
  name: 'global-error-handler',
  description: '',
  handler: async (ctx, next) => {
    ctx.body = 'Hello';
  }
};
