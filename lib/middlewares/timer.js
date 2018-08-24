const log = require('../utils/logger')

module.exports = function (req, res, next) {
  req.params.startTime = req.app.get('startTime')
  log.info('startTime: ' + req.params.startTime)
  next()
}
