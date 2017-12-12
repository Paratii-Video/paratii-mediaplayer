'use strict'


const Clappr = require('clappr')
const Controls = require('./controls')

module.exports = ({ source, selector, mimeType, ...rest }) => new Clappr.Player({
  source,
  mimeType,
  parentId: selector,
  mediacontrol: { external: Controls },
  ...rest
});
