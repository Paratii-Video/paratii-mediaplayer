const Clappr = require("clappr");
const { UICorePlugin } = Clappr;

module.exports = class NoSeekTime extends UICorePlugin {
  get name() {
    return "seek_time";
  }
};
