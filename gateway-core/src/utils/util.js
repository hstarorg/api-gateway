const uuid = require('uuid');

module.exports = {
  /**
   * Is function.
   * @param {*} fn
   */
  isFunction(fn) {
    return typeof fn === 'function';
  },

  /**
   * Ensure return an valid number.
   * @param {*} n
   * @param {number} defaultValue
   */
  ensureNumber(n, defaultValue = 0) {
    n = +n;
    return n !== n ? defaultValue : n;
  },

  uuidV4() {
    return uuid.v4();
  }
};
