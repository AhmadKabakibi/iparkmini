const parkingLots = require('./parkingLots')
const cache = require('../redis').client

module.exports = {
  create (params) {
    return parkingLots.create(params, cache)
  },

  find (params, res, callback) {
    parkingLots.find(params, res, callback)
  }
}
