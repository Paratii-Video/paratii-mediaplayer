const Clappr = require('clappr')
const MediaControl = require('../html/NewMediaControl.html')
const styles = require('styles/controls.scss')

class ParatiiMediaControl extends Clappr.MediaControl {
  get template() {
    return Clappr.template(
      MediaControl
    )
  }

  get stylesheet () {
    return Clappr.Styler.getStyleFor(
      ``
    )
  }

  constructor(options = {}) {
    super(options);
  }

  addEventListeners() {
    super.addEventListeners();
    if (this.container) {
      this.listenTo(this.container, Clappr.Events.CONTAINER_PLAY, this.updatePlayPauseButton)
      this.listenTo(this.container, Clappr.Events.CONTAINER_PAUSE, this.updatePlayPauseButton)
    }
  }

  initializeIcons() {
    super.initializeIcons();
    this.updatePlayPauseButton();
  }

  updatePlayPauseButton() {
    if (!this.container) {
      return;
    }
    if (this.container.isPlaying()) {
      this.$playPauseToggle.removeClass('video-paused');
    } else {
      this.$playPauseToggle.addClass('video-paused');
    }
  }

  togglePlayPause() {
    super.togglePlayPause();
    this.updatePlayPauseButton();
  }
}

module.exports = ParatiiMediaControl;
