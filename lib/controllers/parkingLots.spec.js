const request = require('supertest')
const app = require('../../index')

describe('parkingLots controller', () => {
  describe('POST /v1/parkinglots/1/car', function () {
    xit('should create a new parkinglot', async () => {
      const response = await request(app).post('/v1/parkinglots/1/car')
        .send({
          'carBrand': 'bmw',
          'licensePlate': 'nl-abc-33',
          'timeParkedAt': '{{current_timestamp}}'
        })
      expect(response.status).toBe(200)
      expect(response.type).toEqual('application/json')
      expect(response.body.data).toEqual({})
    })
  })
})
