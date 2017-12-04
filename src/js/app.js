'use strict'

console.log('PARATII EXPERIMENTS')

const Clappr = require('clappr')
const HlsjsIpfsLoader = require('hlsjs-ipfs-loader')
const IPFS = require('ipfs')

const node = new IPFS({
  bitswap: {
    maxMessageSize: 32 * 1024
    // meterController: paratiiIPFS.meterController
  },
  repo: 'paratii-' + String(Math.random() + Date.now()).replace(/\./g, ''),
  config: {
    Addresses: {
      Swarm: [
        '/dns4/star.paratii.video/wss/p2p-webrtc-star'
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

node.on('ready', () => {
  console.log('[PARATII] IPFS node Ready')
})

const vid = new Clappr.Player({
  // source: 'https://gateway.paratii.video/ipfs/QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ', // original mp4
  source: 'https://gateway.paratii.video/ipfs/QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9/master.m3u8', // transcoded multi-bitrate HLS
  // source: '/master.m3u8', // transcoded multi-bitrate HLS
  parentId: '#player',
  mimeType: 'video/mp4',
  watermark: 'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png',
  watermarkPosition: 'top-right',
  watermarkLink: 'http://paratii.video/',
  playback: {
    hlsjsConfig: {
      loader: HlsjsIpfsLoader,
      ipfs: node,
      ipfsHash: 'QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9'
    }
  }
})

function runExperiment (name, cb) {
  let metrics = {
    starttime: Date.now(),
    finishtime: 0,
    name: name
  }
}
