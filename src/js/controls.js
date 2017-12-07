const Clappr = require('clappr')
const MediaControl = require('../html/NewMediaControl.html')
const styles = require('styles/controls.less')

class ParatiiMediaControl extends Clappr.MediaControl {
  get template() {
    return Clappr.template(
      MediaControl
    )
  }
  constructor(options = {}) {
    super(options);
  }

  initializeIcons() {
    super.initializeIcons();
    this.$playPauseToggle.removeClass('video-paused');
  }

  togglePlayPause() {
    console.log('here');
    super.togglePlayPause();

    if (this.container.isPlaying()) {
      this.$playPauseToggle.removeClass('video-paused');
    } else {
      this.$playPauseToggle.addClass('video-paused');
    }
  }
}

module.exports = ParatiiMediaControl;
