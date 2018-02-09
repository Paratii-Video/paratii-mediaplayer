"use strict";

const Clappr = require("clappr");
const HlsjsIpfsLoader = require("hlsjs-ipfs-loader");
const IPFS = require("ipfs");
const Controls = require("./controls");
const NoSeekTime = require("./plugins/NoSeekTime");

module.exports = ({
  selector,
  source,
  poster,
  mimeType,
  ipfsHash,
  plugins,
  node,
  ...rest
}) => {
  const ipfsNode =
    node ||
    new IPFS({
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
  plugins = plugins || [];
  const corePlugins = plugins.core || [];

  return new Clappr.Player({
    source,
    poster,
    mimeType,
    parentId: selector,
    height: "100vh",
    width: "100%",
    hideMediaControl: false,
    mediacontrol: { external: Controls },
    position: "top-right",
    watermarkLink: "http://paratii.video/",
    plugins: {
      ...plugins,
      core: [NoSeekTime, ...corePlugins]
    },
    playback: {
      hlsjsConfig: {
        fLoader: HlsjsIpfsLoader,
        ipfs: ipfsNode,
        ipfsHash,
        enableWorker: true,
        // startLevel: 0,
        autoLevelEnabled: true,
        autoStartLoad: true,
        maxLoadingDelay: 2,
        maxStarvationDelay: 2
      }
    },
    ...rest
  });
};
