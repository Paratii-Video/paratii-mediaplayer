'use strict'

console.log('PARATII EXPERIMENTS')

const Clappr = require('clappr')
const Controls = require('./controls')

module.exports = ({ source, selector, mimeType }) => new Clappr.Player({
  source,
  mimeType,
  parentId: selector,
  mediacontrol: { external: Controls },
});
