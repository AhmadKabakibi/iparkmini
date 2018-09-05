const parkingLots = require('./parkingLots')
const cache = require('../redis').client
const logger = require('../utils/logger')

describe('parkingLots service', () => {
  it('Should be able to create parking car object and save it to the database', () => {
    jest.spyOn(cache, 'incrAsync').mockResolvedValue(1)
    jest.spyOn(cache, 'decrAsync').mockResolvedValue(1)
    jest.spyOn(logger, 'error').mockResolvedValue(1)

    parkingLots.create({
      carBrand: 'bmw',
      licensePlate: '12-3ff-32',
      parkinglotId: '2',
      timeParkedAt: '2018-08-15T16:36:31+00:00'
    }, cache, (data) => {
      expect(data).toMatchObject({
        carBrand: 'bmw',
        licensePlate: '12-3ff-32',
        parkinglotId: '2',
        timeParkedAt: '2018-08-15T16:36:31+00:00'
      })
      expect(cache.incrAsync).toHaveBeenCalled()
      expect(cache.decrAsync).toHaveBeenCalled()
    })
  })

  it('Should not be able to create parking car object when the parking lot is full', () => {
    jest.spyOn(cache, 'incrAsync').mockResolvedValue(1)
    jest.spyOn(cache, 'decrAsync').mockResolvedValue(1)
    jest.spyOn(logger, 'error').mockResolvedValue(1)
    cache.setAsync('parkinglot:5:total', 23)
    parkingLots.create({
      carBrand: 'bmw',
      licensePlate: '12-3ff-32',
      parkinglotId: '5',
      timeParkedAt: '2018-08-15T16:36:31+00:00'
    }, cache, (data) => {
      expect(data).toMatchObject({
        carBrand: 'bmw',
        licensePlate: '12-3ff-32',
        parkinglotId: '5',
        timeParkedAt: '2018-08-15T16:36:31+00:00'
      })
      expect(logger.error).toHaveBeenCalledWith('Parking lot (5) is full')
      expect(cache.incrAsync).toHaveBeenCalled()
      expect(cache.decrAsync).toHaveBeenCalled()
    })
  })
})
