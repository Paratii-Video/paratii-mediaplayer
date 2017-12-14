"use strict";

const Clappr = require("clappr");
const HlsjsIpfsLoader = require("hlsjs-ipfs-loader");
const IPFS = require("ipfs");
const Controls = require("./controls");
const NoSeekTime = require("./plugins/NoSeekTime");

const node = new IPFS({
  bitswap: {
    maxMessageSize: 128 * 1024
  },
  repo: "paratii-" + String(Math.random() + Date.now()).replace(/\./g, ""),
  config: {
    Addresses: {
      Swarm: ["/dns4/star.paratii.video/tcp/443/wss/p2p-webrtc-star"]
    },
    Bootstrap: [
      "/dns4/bootstrap.paratii.video/tcp/443/wss/ipfs/QmeUmy6UtuEs91TH6bKnfuU1Yvp63CkZJWm624MjBEBazW"
    ]
  }
});

module.exports = ({ selector, source, poster, mimeType, ipfsHash, ...rest }) =>
  new Clappr.Player({
    source,
    poster,
    mimeType,
    parentId: selector,
    height: "100vh",
    width: "100%",
    mediacontrol: { external: Controls },
    watermark:
      "http://paratii.video/imagens/cropped-logo_colorido_horizontal.png",
    position: "top-right",
    watermarkLink: "http://paratii.video/",
    plugins: [NoSeekTime],
    playback: {
      hlsjsConfig: {
        loader: HlsjsIpfsLoader,
        ipfs: node,
        ipfsHash,
        enableWorker: true,
        startLevel: 0,
        autoLevelEnabled: false,
        autoStartLoad: true,
        maxLoadingDelay: 2
      }
    },
    ...rest
  });
