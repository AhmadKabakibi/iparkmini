const startTime = require('./timer')

describe('startTime middleware', () => {
  it('Should return app startTime on each request', async () => {
    let req = {
      app: {
        get: jest.fn().mockReturnValue('2018-08-15T16:36:31+00:00')
      },
      params: {}
    }
    let res = {}
    startTime(req, res, () => {})
    expect(req.params.startTime).toBe('2018-08-15T16:36:31+00:00')
  })
})
