'use strict'


const Clappr = require('clappr')
const Controls = require('./controls')

module.exports = ({ source, selector, mimeType, ...rest }) => new Clappr.Player({
  source: '/video/tsn.mp4',
  mimeType,
  parentId: selector,
  mediacontrol: { external: Controls },
  ...rest
});
