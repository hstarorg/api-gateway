const { util } = require('../utils');
const apiConfig = require('../../mock/api-config');

const pathMap = new Map();
const apiMap = new Map();

function convertApiConfig() {
  apiConfig.apis.forEach(api => {
    const apiKey = util.uuidV4();
    apiMap.set(apiKey, {
      hosts: api.apiHosts.map(h => `${h.host}:${h.port}`),
      loadBalanceMode: api.loadBalanceMode,
      idx: 0
    });
    api.paths.forEach(item => {
      const fullPath = `${api.apiBase}${item.path}`;
      pathMap.set(fullPath, apiKey);
    });
  });
}

function getReverseInfoByPath(path) {
  const apiKey = pathMap.get(path);
  if (!apiKey) {
    return null;
  }
  const apiInfo = apiMap.get(apiKey);
  return {
    apiInfo,
    path
  };
}

convertApiConfig();

module.exports = {
  priority: 15,
  name: 'get-route',
  description: '',
  handler: async (ctx, next) => {
    const reverseInfo = getReverseInfoByPath(ctx.path);
    if (reverseInfo == null) {
      ctx.throw('找不到对应的API', 404);
    }
    ctx.state.$$gateway.reverseInfo = reverseInfo;
    await next();
  }
};
