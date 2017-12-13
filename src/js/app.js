'use strict'

const Clappr = require('clappr')
const Controls = require('./controls')
const NoSeekTime = require('./plugins/NoSeekTime')

module.exports = ({ source, selector, mimeType, ...rest }) => new Clappr.Player({
  source: '/video/tsn.mp4',
  mimeType,
  parentId: selector,
  mediacontrol: { external: Controls },
  plugins: [NoSeekTime],
  ...rest
})