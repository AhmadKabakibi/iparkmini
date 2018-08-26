const mongoose = require('mongoose')

// Use bluebird
mongoose.Promise = require('bluebird')

module.exports = {
  connect () {
    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
      useNewUrlParser: true
    })
  },

  disconnect () {
    mongoose.disconnect()
  }
}
