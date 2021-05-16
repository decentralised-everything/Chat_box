const emojify = require("./emoji");

const replacer = (match) => {
  const emoji = emojify[match];
  return emoji ? emoji : match;
};

module.exports = (string) => string.replace(/(\:.*?\:)/, replacer);
