const Parking = require('./parking')

describe('Parking', () => {
  it('Should return an error if ', (done) => {
    const parking = new Parking({
      carBrand: 'volkswagen',
      licensePlate: '12-abc-34',
      parkinglotId: 12,
      timeParkedAt: '2018-08-15T16:36:31+00:00'
    })
    parking.validate(response => {
      done()
    })
  })
})
