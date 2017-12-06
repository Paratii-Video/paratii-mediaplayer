'use strict'

console.log('PARATII EXPERIMENTS')

const Clappr = require('clappr')
const HlsjsIpfsLoader = require('hlsjs-ipfs-loader')
const IPFS = require('ipfs')
// const LevelSelector = require('level-selector') // TODO , fork n fix npm installation.
const LevelSelector = require('./level-selector/level-selector.js')
const ClapprStats = require('clappr-stats')
// const ClapprNerdStats = require('clappr-nerd-stats')

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

const vid = new Clappr.Player({
  // source: 'https://gateway.paratii.video/ipfs/QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ', // original mp4
  source: 'https://gateway.paratii.video/ipfs/QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9/master.m3u8', // transcoded multi-bitrate HLS
  // source: '/master.m3u8', // transcoded multi-bitrate HLS
  plugins: [LevelSelector, ClapprStats],
  // plugins: {
  //   core: [ClapprNerdStats, LevelSelector],
  //   container: [ClapprStats]
  // },
  levelSelectorConfig: {
    title: 'Quality',
    labels: {
      4: 'HD',
      3: 'High',
      2: 'default-', // 500kbps
      1: 'Med', // 240kbps
      0: 'Low' // 120kbps
    },
    labelCallback: function (playbackLevel, customLabel) {
      return customLabel + playbackLevel.level.height + 'p' // High 720p
    }
  },
  clapprStats: {
    // optional: time in miliseconds for each report.
    // default: 5000
    runEach: 5000,
    // optional: callback function.
    // default: console.log
    onReport: (metrics) => { console.log('metrics: ', metrics) },
    // Fire PERCENTAGE_EVENT when video complete some percentage.
    // default: []
    onCompletion: [10, 20, 55, 100],
    // optional: provide an img uri hosted at the same place as your farm
    // or near of it prefferable 1x1px, without caching.
    // default: none
    // uriToMeasureLatency: 'https://gateway.paratii.video/ipfs/QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9/thumbnail-1280x720_1.png',
    // optional: provide some assets uris hosted at the same place as your farm
    // or near of it prefferable in an uncompressible file format, without caching.
    // default: none
    // urisToMeasureBandwidth: [
    //  {url: 'https://gateway.paratii.video/ipfs/QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9/thumbnail-1280x720_1.png', timeout: 10000},
    //  {url: 'https://gateway.paratii.video/ipfs/QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9/thumbnail-1280x720_2.png', timeout: 16000},
    //  {url: 'https://gateway.paratii.video/ipfs/QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9/thumbnail-1280x720_3.png', timeout: 22000}
    // ],
    // optional: number of reports between two consecutive bandwidth tests.
    // default: 10
    runBandwidthTestEvery: 10
  },
  // clapprNerdStats: {
  //   // Optional: provide multiple combination of keyboard shortcuts to show/hide the statistics.
  //   // For reference, visit: https://github.com/ccampbell/mousetrap.
  //   // Default: ['command+shift+s', 'ctrl+shift+s']
  //   shortcut: ['command+shift+s', 'ctrl+shift+s'],
  //
  //   // Optional: position of the icon to show/hide the statistics.
  //   // Values: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'none'
  //   // Default: 'top-right'
  //   iconPosition: 'top-right'
  // },
  parentId: '#player',
  mimeType: 'video/mp4',
  watermark: 'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png',
  watermarkPosition: 'top-right',
  watermarkLink: 'http://paratii.video/',
  playback: {
    hlsjsConfig: {
      loader: HlsjsIpfsLoader,
      ipfs: node,
      ipfsHash: 'QmQvhvzMXKX71jLGjSfM9iKiWVKETXDmkPaQXhe4WrMmZ9',
      enableWorker: true,
      startLevel: 0,
      autoLevelEnabled: false,
      autoStartLoad: true,
      maxLoadingDelay: 2
    }
  }
})

console.log(vid.core.getCurrentContainer().getPlugin('clappr_stats'))

function getDAG (callback) {
  if (!callback) callback = () => {}
  if (!node) {
    return callback(null)
  }

  if (vid._options.playback.hlsjsConfig.dag && vid._options.playback.hlsjsConfig.dag !== null) {
    return callback(null, vid._options.playback.hlsjsConfig.dag)
  }
  console.log('getting parent DAG ' + vid._options.playback.hlsjsConfig.ipfsHash)
  node.object.get(vid._options.playback.hlsjsConfig.ipfsHash, (err, res) => {
    if (err) throw err
    vid._options.playback.hlsjsConfig.dag = res.links
    console.log('DAG: ', res.links)
    callback(null, res.links)
  })
}

node.on('ready', () => {
  console.log('[PARATII] IPFS node Ready')
  getDAG((err, dag) => {
    if (err) throw err
    console.log('[PARATII] got IPFS Dag ', dag)
  })
})

// function runExperiment (name, cb) {
//   let metrics = {
//     starttime: Date.now(),
//     finishtime: 0,
//     name: name
//   }
// }
