const log = require('./logger')

module.exports = {
  check () {
    var valid = true

    if (!process.env.NODE_ENV) {
      log.error('WARNING: Missing environment variables.')
      valid = false
    }

    if (!valid) {
      log.error('Exiting: Critical env variable missing')
      process.exit()
    }
  }
}
