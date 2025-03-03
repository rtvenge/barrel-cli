const colors = require('colors')
const theme = require('@shopify/themekit').command
const config = require('./configure')

const sendToShopify = (action, src, cb) => {
  if (~config.get('ignore').indexOf(
    src.replace(/\/?dist\//, '')
  )) {
    console.log(`Ignoring: ${src}`.blue)
    return cb()
  }

  theme({
    args: [
      action,
      '--env', process.env.ENV,
      '--config', config.get('configPath'),
      src
    ],
    logLevel: 'silent'
  }, e => {
    if (e) {
      console.log(`${e}`.red)
    } else {
      console.log(`[${action}] ${src}`.white)
    }

    cb(e)
  })
}

module.exports = {
  sendToShopify
}
