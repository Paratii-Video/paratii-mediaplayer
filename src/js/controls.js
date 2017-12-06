const Clappr = require('clappr')
const MediaControl = require('../html/NewMediaControl.html')
const styles = require('styles/controls.less')

class ParatiiMediaControl extends Clappr.MediaControl {
  get template() {
    console.log(MediaControl)
    return Clappr.template(
      MediaControl
    )
  }
  constructor(options = {}) {
      super(options);
  }
}

module.exports = ParatiiMediaControl;
