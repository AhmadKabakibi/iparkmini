const mongoose = require('mongoose')

module.exports = {
  connect () {
    mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
      useNewUrlParser: true
    })
  },

  disconnect () {
    mongoose.disconnect()
  }
}
