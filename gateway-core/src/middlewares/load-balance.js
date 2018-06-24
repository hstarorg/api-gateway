function getForwardInfo(ctx, { apiInfo, path }) {
  const hostLen = apiInfo.hosts.length;
  const result = { path };
  if (apiInfo.loadBalanceMode === 'iphash') {
    const idx = Math.floor(Math.random() * hostLen);
    result.host = apiInfo.hosts[idx];
  } else if (apiInfo.loadBalanceMode === 'polling') {
    apiInfo.idx += 1;
    if (apiInfo.idx >= hostLen) {
      apiInfo.idx = 0;
    }
    result.host = apiInfo.hosts[apiInfo.idx];
  }
  return result;
}

module.exports = {
  priority: 20,
  name: 'load-balance',
  description: '',
  handler: async (ctx, next) => {
    const forwardInfo = getForwardInfo(ctx, ctx.state.$$gateway.reverseInfo);
    ctx.state.$$gateway.forwardInfo = forwardInfo;
    await next();
  }
};
