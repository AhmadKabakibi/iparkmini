const { redis } = require('./redis-promisify')
const log = require('./utils/logger')

// By default redis.createClient() will use 127.0.0.1 and port 6379,
// otherwise use process.env.REDIS_HOST and REDIS_PORT
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: 0
})

client.on('connect', () => {
  log.info(`Redis client connected`)
})

client.on('ready', () => {
  log.info(`Redis client ready`)
})

client.on('error', (error) => {
  log.error(`Error starting Client Redis`)
  log.error(error)
})

module.exports = {
  client: client
}
