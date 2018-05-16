"use strict";

const Clappr = require("clappr");
const HlsjsIpfsLoader = require("hlsjs-ipfs-loader");
const IPFS = require("ipfs");

module.exports = ({
  selector,
  source,
  poster,
  mimeType,
  ipfsHash,
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

  return new Clappr.Player({
    source,
    poster,
    mimeType,
    parentId: selector,
    width: "100%",
    height: "100%",
    chromeless: true,
    position: "top-right",
    watermarkLink: "http://paratii.video/",
    playback: {
      hlsjsConfig: {
        fLoader: HlsjsIpfsLoader,
        ipfs: ipfsNode,
        ipfsHash,
        enableWorker: true,
        autoLevelEnabled: true,
        autoStartLoad: true,
        maxLoadingDelay: 2,
        maxStarvationDelay: 2
      }
    },
    clappr: Clappr,
    ...rest
  });
};
