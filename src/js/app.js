'use strict'
const Clappr = require('clappr')
const Controls = require('./controls')
const NoSeekTime = require('./plugins/NoSeekTime')

const vid = new Clappr.Player({
  // source: 'https://gateway.paratii.video/ipfs/QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ', // original mp4
  source: '/public/video/tsn.mp4', // transcoded multi-bitrate HLS
  // source: '/master.m3u8', // transcoded multi-bitrate HLS
  parentId: '#player',
  mimeType: 'video/mp4',
  watermark: 'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png',
  watermarkPosition: 'top-right',
  watermarkLink: 'http://paratii.video/',
  hideMediaControl: false,
  mediacontrol: { external: Controls },
  plugins: [NoSeekTime]
})
