'use strict'

const Clappr = require('clappr')
const Controls = require('./controls')
const NoSeekTime = require('./plugins/NoSeekTime')

const HlsjsIpfsLoader = require('hlsjs-ipfs-loader')
const IPFS = require('ipfs')

const node = new IPFS({
  bitswap: {
    maxMessageSize: 128 * 1024
    // meterController: paratiiIPFS.meterController
  },
  repo: 'paratii-' + String(Math.random() + Date.now()).replace(/\./g, ''),
  config: {
    Addresses: {
      Swarm: [
        // '/dns4/star.paratii.video/wss/p2p-webrtc-star'
        '/dns4/star.paratii.video/tcp/443/wss/p2p-webrtc-star'
      ]
    },
    Bootstrap: [
      // '/ip4/127.0.0.1/tcp/4003/ws/ipfs/Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS',
      // '/libp2p-webrtc-star/ip4/127.0.0.1/tcp/9091/wss/ipfs/Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS',
      // '/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss/ipfs/Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS',
      // '/ip4/34.213.133.148/tcp/4003/ws/ipfs/QmeUmy6UtuEs91TH6bKnfuU1Yvp63CkZJWm624MjBEBazW',
      '/dns4/bootstrap.paratii.video/tcp/443/wss/ipfs/QmeUmy6UtuEs91TH6bKnfuU1Yvp63CkZJWm624MjBEBazW'
    ]
  }
})

module.exports = ({ selector, source, poster, mimeType, ipfsHash, ...rest }) => new Clappr.Player({
  // source: '/video/tsn.mp4',
  source,
  poster,
  mimeType,
  parentId: selector,
  // mediacontrol: { external: Controls },
  watermark: 'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png',
  position: 'top-right',
  watermarkLink: 'http://paratii.video/',
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
})
