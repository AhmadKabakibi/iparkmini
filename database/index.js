const mongoose = require('mongoose')

// Use bluebird
mongoose.Promise = require('bluebird')

module.exports = {
  connect (DBHOST = process.env.DB_HOST) {
    mongoose.connect(`mongodb://${DBHOST}/${process.env.DB_NAME}`, {
      useNewUrlParser: true
    })
  },

  disconnect () {
    mongoose.disconnect()
  }
}
