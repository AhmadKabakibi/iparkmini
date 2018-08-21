const mongoose = require('mongoose')

module.exports = {
  start: start,
  stop: stop
}

function start () {
  mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, { useNewUrlParser: true })
}

function stop () {
  mongoose.disconnect()
}
