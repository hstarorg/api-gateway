const path = require('path');
const fs = require('fs');

const { util } = require('../utils');

module.exports = {
  _getMiddlewareList() {
    const middlewareNameList = [];
    fs.readdirSync(path.join(__dirname)).forEach(name => {
      if (fs.name !== 'index.js' && path.extname(name) === '.js') {
        middlewareNameList.push(name);
      }
    });
    return middlewareNameList;
  },
  /**
   * Attach middlewares on app.
   * @param {*} app
   */
  attach(app) {
    const mList = this._getMiddlewareList();

    // Load middlewares, handler must exists, sort by priority asc.
    const middleWareList = mList
      .map(name => require(`./${name}`))
      .filter(x => util.isFunction(x.handler))
      .sort((x1, x2) => util.ensureNumber(x1.priority, 0) - util.ensureNumber(x2.priority, 0));

    // Register middlewares
    middleWareList.forEach(mid => {
      app.use(mid.handler);
      console.log(`Load middleware \`${mid.name}\` successfully.`);
    });
  }
};
