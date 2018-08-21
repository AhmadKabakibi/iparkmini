const fs = require('fs')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'
let configBuffer = null

// Init config_buffer according to the NODE_ENV
switch (NODE_ENV) {
  case 'production':
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'production.json'), 'utf-8')
    break
  case 'development':
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'staging.json'), 'utf-8')
    break
  default:
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'default.json'), 'utf-8')
}

let config = JSON.parse(configBuffer)
module.exports = config
