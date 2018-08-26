const parkingLots = require('./parkingLots')
const cache = require('../redis').client

module.exports = {
  create (params) {
    return new Promise(function (resolve, reject) {
      parkingLots.create(params, cache, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  },

  find (params, res, callback) {
    parkingLots.find(params, res, callback)
  }
}
