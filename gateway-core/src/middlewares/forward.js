const request = require('request');

module.exports = {
  priority: 25,
  name: 'forward',
  description: '',
  handler: async (ctx, next) => {
    const forwardInfo = ctx.state.$$gateway.forwardInfo;
    await new Promise(resovle => {
      request(`http://${forwardInfo.host}/${forwardInfo.path}`, function(err, res, body) {
        if (err) {
          ctx.body = err.message;
        }
        resovle();
      });
    });
  }
};
