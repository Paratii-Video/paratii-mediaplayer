const Clappr = require('clappr')
const MediaControl = require('../html/NewMediaControl.html')
const styles = require('styles/controls.scss')

const { Events } = Clappr;

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

  // addEventListeners() {
  //   super.addEventListeners();
  //   if (this.container) {
  //     this.listenTo(this.container, Clappr.Events.CONTAINER_PLAY, this.updatePlayPauseButton)
  //     this.listenTo(this.container, Clappr.Events.CONTAINER_PAUSE, this.updatePlayPauseButton)
  //   }
  // }

  // initializeIcons() {
  //   super.initializeIcons();
  //   this.updatePlayPauseButton();
  // }

  // updatePlayPauseButton() {
  //   if (!this.container) {
  //     return;
  //   }
  //   if (this.container.isPlaying()) {
  //     this.$playPauseToggle.removeClass('video-paused');
  //   } else {
  //     this.$playPauseToggle.addClass('video-paused');
  //   }
  // }

  // togglePlayPause() {
  //   super.togglePlayPause();
  //   this.updatePlayPauseButton();
  // }

  // mousemoveOnSeekBar(event) {
  //   if (this.settings.seekEnabled) {
  //     const seekBarHoverWidth = this.$seekBarHover.width()
  //     let offsetX = event.pageX - this.$seekBarContainer.offset().left - (seekBarHoverWidth / 2)
  //     offsetX = Math.max(-seekBarHoverWidth / 2, offsetX)
  //     offsetX = Math.min(offsetX, this.$seekBarContainer.width() - seekBarHoverWidth / 2)
  //     this.$seekBarHover.css({left: offsetX})
  //   }
  //   this.trigger(Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR, event)
  // }
}

module.exports = ParatiiMediaControl;
