const app = require('./index')
const request = require('supertest')

describe('index route', () => {
  it('should respond with a 200 with no parameters', async () => {
    const response = await request(app).get('/')

    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('{"message":"Welcome to API iparkmini.","version":"1.0.0"}')
  })
})
