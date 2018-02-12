const Clappr = require("clappr");
require("styles/controls.scss");

class ParatiiMediaControl extends Clappr.MediaControl {
  get template() {
    return Clappr.template("");
  }

  get stylesheet() {
    return Clappr.Styler.getStyleFor("");
  }
}

module.exports = ParatiiMediaControl;
