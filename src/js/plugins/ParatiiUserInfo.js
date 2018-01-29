import React from "react";
import ReactDOM from "react-dom";
import Transition from "react-transition-group/Transition";
import { Events, UICorePlugin } from "clappr";
import "styles/plugins/ParatiiUserInfo.scss";

const userInfo = {
  name: "Simone Medelin",
  avatarUrl: "http://img.izismile.com/img/img2/20090416/carrot_top_11.jpg",
  ptiBalance: 4914,
  ethBalance: 914441
};

class ParatiiUserInfoComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoOpen: false,
      ethUSDRate: 1,
      ptiUSDRate: 1
    };

    this.requestClose = false;

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onButtonClick() {
    this.setState(prevState => ({
      infoOpen: !prevState.infoOpen
    }));
  }

  formatBalance(balance) {
    return parseFloat(balance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  getMenuStyles() {
    return {
      entering: { opacity: 0, transform: "scale(0)" },
      entered: { opacity: 1 },
      exiting: { opacity: 1 },
      exited: { opacity: 0, transform: "scale(0)" }
    };
  }

  onCloseClick() {
    this.requestClose = true;
    this.setState({
      infoOpen: false
    });
  }

  onExited() {
    if (this.closed) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <div className="paratii__user-info">
        <button
          className={`media-control-button paratii__user-info--button${
            this.state.infoOpen ? " paratii__user-info--button--active" : ""
          }`}
          onClick={this.onButtonClick}
        />
        <Transition
          in={this.state.infoOpen}
          timeout={250}
          onExited={this.onExited}
        >
          {transitionState => (
            <div
              className="paratii__user-info--menu"
              style={this.getMenuStyles()[transitionState]}
            >
              <button
                className="paratii__user-info--close-button"
                onClick={this.onCloseClick}
              />
              <div className="paratii__user-info--avatar-wrapper">
                <img
                  className="paratii__user-info--avatar"
                  src={this.props.avatarUrl}
                />
                <a
                  href="https://portal.paratii.video/"
                  className="paratii__user-info--link"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>,
              <div className="paratii__user-info--details">
                <div className="paratii__user-info--name">
                  {this.props.name}
                </div>
                <div className="paratii__user-info--pti">
                  {this.formatBalance(this.props.ptiBalance)} PTI
                </div>
                <div className="paratii__user-info--eth">
                  {this.formatBalance(this.props.ethBalance)} ETH
                </div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default class ParatiiUserInfo extends UICorePlugin {
  get name() {
    return "paratii_user_info";
  }

  get type() {
    return "core";
  }

  get attributes() {
    return {
      id: "paratii__user-info--container"
    };
  }

  bindEvents() {
    this.listenTo(
      this.core.mediaControl,
      Events.MEDIACONTROL_CONTAINERCHANGED,
      this.reload
    );
    this.listenTo(
      this.core.mediaControl,
      Events.MEDIACONTROL_RENDERED,
      this.render
    );
    this.listenTo(
      this.core.mediaControl,
      Events.MEDIACONTROL_HIDE,
      this.hideContextMenu
    );
    this.listenTo(
      this.core.mediaControl,
      ParatiiUserInfo.MEDIACONTROL_PLAYBACKRATE,
      this.updatePlaybackRate
    );
  }

  unBindEvents() {
    this.stopListening(
      this.core.mediaControl,
      Events.MEDIACONTROL_CONTAINERCHANGED
    );
    this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_RENDERED);
    this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_HIDE);
  }

  reload() {
    this.unBindEvents();
    this.bindEvents();
  }

  shouldRender() {
    if (!this.core.getCurrentContainer()) {
      return false;
    }

    var currentPlayback = this.core.getCurrentPlayback();
    if (
      currentPlayback.tagName !== "video" &&
      currentPlayback.tagName !== "audio"
    ) {
      // console.warn('ParatiiUserInfo#shouldRender: Cannot affect rate for playback', currentPlayback);
      return false;
    }

    return true;
  }

  unmount() {
    const container = this.core.mediaControl.$(
      "#paratii__user-info--container"
    )[0];
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
  }

  render() {
    if (this.shouldRender()) {
      this.core.mediaControl.$(".media-control-left-panel").append(this.el);
      const container = this.core.mediaControl.$(
        "#paratii__user-info--container"
      )[0];
      if (container) {
        ReactDOM.render(
          <ParatiiUserInfoComponent
            {...userInfo}
            onClose={this.unmount.bind(this)}
          />,
          this.core.mediaControl.$("#paratii__user-info--container")[0]
        );
      }
    }

    return this;
  }

  onRateSelect(event) {
    // console.log('onRateSelect', event.target);
    let rate = event.target.dataset.playbackRateSelect;
    this.setSelectedRate(rate);
    this.toggleContextMenu();
    event.stopPropagation();
    return false;
  }

  onShowMenu(event) {
    this.toggleContextMenu();
  }

  toggleContextMenu() {
    this.$(".paratii-user-info-menu").toggle();
  }

  hideContextMenu() {
    this.$(".paratii-user-info-menu").hide();
  }

  updatePlaybackRate(rate) {
    this.setSelectedRate(rate);
  }

  setSelectedRate(rate) {
    // Set <video playbackRate="..."
    this.core.$el.find("video,audio").get(0).playbackRate = rate;
    this.selectedRate = rate;
    this.updateText();
  }

  setActiveListItem(rateValue) {
    this.$(`a`).removeClass("active");
    this.$(`a[data-playback-rate-select="${rateValue}"]`).addClass("active");
  }

  buttonElement() {
    return this.$(".playback_rate button");
  }

  getTitle() {
    let title = this.selectedRate;
    this.playbackRates.forEach(r => {
      if (r.value === this.selectedRate) {
        title = r.label;
      }
    });
    return title;
  }

  updateText() {
    this.buttonElement().text(this.getTitle());
    this.setActiveListItem(this.selectedRate);
  }
}

ParatiiUserInfo.type = "core";
ParatiiUserInfo.MEDIACONTROL_PLAYBACKRATE = "playbackRate";