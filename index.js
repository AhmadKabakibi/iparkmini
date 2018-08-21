if (!process.env.NODE_ENV) { require('dotenv').config() }
require('./lib/utils/check-env').check()

const log = require('./lib/utils/logger')
const app = require('express')()
require('./lib/controllers')(app)

try {
  const server = require('http').createServer(app)
  require('./lib/utils/web-sockets').registerServer(server)
  server.listen(process.env.PORT)
  require('./database').start()
  log.info(`API booted`)
  log.info(`Environment          : ${process.env.NODE_ENV}`)
  log.info(`Port                 : ${server.address().port}`)
} catch (error) {
  log.error(`Error starting API`)
  log.error(error)
}

module.exports = app
