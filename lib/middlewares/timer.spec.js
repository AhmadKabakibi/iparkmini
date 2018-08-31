const request = require('supertest')
const app = require('../../index')

describe('startTime middleware', () => {
  it('Should return app startTime on each request', async () => {
    app.set('startTime', '2018-08-15T16:36:31+00:00')
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.params.startTime).toBe('2018-08-15T16:36:31+00:00')
  })
})

