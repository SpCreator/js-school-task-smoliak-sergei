const errors = require("../errors.js");

(function() {
  const MIN_INPUT_VALUE = -(2**31);
  const MAX_INPUT_VALUE = 2**31 - 1;

  /**
   * Checking of the polindrime
   * 
   * @param {*} incomData
   */
  polyindromeСheck = incomData => {
    const data = incomData;
    let result = '';

    if (!incomData || typeof incomData != "number") {
      errors.errors("number", typeof incomData);
      return false;
    }

    if (MIN_INPUT_VALUE <= incomData && incomData <= MAX_INPUT_VALUE) {
      result = data === +(incomData.toString().split("").reverse().join(""));
    } else {
      errors.errors("minxMaxInteger", data, MIN_INPUT_VALUE, MAX_INPUT_VALUE);
      return false;
    }

    return result;
  }

  module.exports = {polyindromeСheck};
})();
