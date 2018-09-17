"use strict";
require('abortcontroller-polyfill/dist/polyfill-patch-fetch')
const Clappr = require("clappr");
const HlsjsIpfsLoader = require("hlsjs-ipfs-loader");
const HlsjsLPLoader = require("hlsjs-lp-loader");
const IPFS = require("ipfs");
console.log('modded mediaplayer')

module.exports = ({
  selector,
  source,
  poster,
  mimeType,
  ipfsHash,
  node,
  lpBoardcaster,
  lpConfig,
  ...rest
}) => {
  var ipfsNode
  let hlsjsConfig

  if (!lpBoardcaster && ipfsHash) {
    ipfsNode = node || new IPFS({
      bitswap: {
        // maxMessageSize: 256 * 1024
        maxMessageSize: 128 * 1024
      },
      EXPERIMENTAL: {
        pubsub: true,
        relay: {
          enabled: true,
          hop: {
            enabled: true
          }
        }
      },
      start: true,
      repo: "paratii-" + String(Math.random() + Date.now()).replace(/\./g, ""),
      config: {
        Addresses: {
          Swarm: [
            '/dns4/star.paratii.video/tcp/443/wss/p2p-webrtc-star',
            '/dns4/ws.star.paratii.video/tcp/443/wss/p2p-websocket-star/'
          ]
        },
        Discovery: {
          webRTCStar: {
            Enabled: true
          }
        },
        Bootstrap: ['/dns4/bootstrap.paratii.video/tcp/443/wss/ipfs/QmeUmy6UtuEs91TH6bKnfuU1Yvp63CkZJWm624MjBEBazW']
      }

    });

    hlsjsConfig = {
      fLoader: HlsjsIpfsLoader,
      ipfs: ipfsNode,
      ipfsHash,
      enableWorker: true,
      autoLevelEnabled: true,
      autoStartLoad: true,
      maxLoadingDelay: 2,
      maxStarvationDelay: 2
    }
  } else {
    hlsjsConfig = {
      pLoader: HlsjsLPLoader,
      lpConfig: lpConfig,
      lpBoardcaster: lpBoardcaster,
      enableWorker: true,
      autoLevelEnabled: true,
      autoStartLoad: true,
      maxLoadingDelay: 2,
      maxStarvationDelay: 2
    }
  }

  const player = new Clappr.Player({
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
      hlsjsConfig: hlsjsConfig
    },
    ...rest
  });

  player.clappr = Clappr;

  console.log('player.clappr', player.clappr)

  return player;

};
