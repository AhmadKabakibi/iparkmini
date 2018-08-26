const validateRequest = require('./validate-request')
const moxios = require('moxios')
const request = require('supertest')

describe('validateRequest', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  test('should return resolved promsie for valid object passed throw', async () => {
  /*   moxios.stubRequest(/request_url/, {
      status: 200,
      response: {
        'carBrand': 'value',
        'licensePlate': 'value'
      }
    })

    await request().get('request_url')
    const validation = validateRequest(moxios.requests.mostRecent(), {
      'carBrand': { in: 'body',
        notEmpty: true
      },
      'licensePlate': { in: 'body',
        notEmpty: true
      }
    })
    expect(validation).toBe(true) */
  })
})
