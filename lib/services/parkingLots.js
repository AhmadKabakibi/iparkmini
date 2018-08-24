const log = require('../utils/logger')
const Parking = require('../../database/parking')
const units = require('../constants')

module.exports = {
  create (params, cache) {
    const parkinglotKey = 'parkinglot:' + params.parkinglotId + ':total'
    cache.incrAsync(parkinglotKey)
      .then((total) => {
        log.info('parkinglot total:' + total)
        if (Number(total) > units.MAX_CARS) {
          cache.decrAsync(parkinglotKey)
            .then((total) => {
              log.error('Parking lot (' + params.parkinglotId + ') is full')
              Promise.resolve('Parking lot (' + params.parkinglotId + ') is full')
            })
        } else {
          return new Parking(params).save()
        }
      })
  },

  list (params) {

  }
}
