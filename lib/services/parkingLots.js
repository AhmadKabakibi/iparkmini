const log = require('../utils/logger')
const Parking = require('../../database/parking')
const units = require('../constants')
const moment = require('moment')
const pump = require('pump')
const JSONStream = require('JSONStream')
const es = require('event-stream')

const calculatePrice = function (parkingtime, date) {
  let parkingTime = moment(parkingtime)
  let hoursDiff = Number(moment(date).diff(parkingTime, 'hours'))
  if (hoursDiff > 0) {
    var totalAmount = hoursDiff * units.PRICE
    var discount = hoursDiff > units.DISCOUNT_Duration ? (hoursDiff - units.DISCOUNT_Duration) * units.DISCOUNT : 0
    return {
      amountDue: Number((totalAmount - discount).toFixed(2)),
      discount: Number(discount.toFixed(2))
    }
  } else {
    return {
      amountDue: 0,
      discount: 0
    }
  }
}

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
          const parking = new Parking(params).save()
          return parking
        }
      })
  },

  find (params, res, callback) {
    // Get cars that parked after app started, because when it starts there are no cars
    const ParkedCars = Parking.find({
      parkinglotId: params.parkinglotId,
      timeParkedAt: {
        $gte: params.startTime
      }
    }).lean().cursor()

    res.set('Content-Type', 'application/json')

    let ParkedCarsDue = es.map(function (data, callback) {
      // Date to calculate amount due is app start time plus provided parameter
      let futureDate = moment(params.initTime).add(params.t, 'hours')
      let pricingInfo = calculatePrice(data.timeParkedAt, futureDate)

      let newData = {
        carBrand: data.carBrand,
        licensePlate: data.licensePlate,
        timeParkedAt: data.timeParkedAt,
        value: pricingInfo.amountDue,
        discountInCents: Number((pricingInfo.discount * 100).toFixed(2))
      }

      callback(null, newData)
    })

    pump(ParkedCars, ParkedCarsDue, JSONStream.stringify(), res, function (err) {
      if (err) {
        return callback(err)
      }
    })
  }
}
