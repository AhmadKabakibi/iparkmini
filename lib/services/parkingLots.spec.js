const parkingLots = require('./parkingLots')
const cache = require('../redis').client

describe('parkingLots service', () => {
  it('Should be able to create parking car object and save it to the database', () => {
    jest.spyOn(cache, 'incrAsync').mockResolvedValue(1)
    jest.spyOn(cache, 'decrAsync').mockResolvedValue(1)

    const parking = parkingLots.create({
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
    })
  })
})
