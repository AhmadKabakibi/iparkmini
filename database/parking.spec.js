const mongoose = require('mongoose')
const Parking = require('./parking')

process.env.DB_HOST = 'localhost'
process.env.DB_NAME = 'ipark_db_dev'

describe('Parking Model', () => {
  beforeEach((done) => {
    /*
      Define clearDB function that will loop through all
      the collections in our mongoose connection and drop them.
    */
    function clearDB () {
      for (let i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(() => {})
      }
      return done()
    }

    /*
      If the mongoose connection is closed,
      start it up using the test url and database name
      provided by the node runtime ENV
    */
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(
        `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, (err) => {
          if (err) throw err
          return clearDB()
        }
      )
    } else {
      return clearDB()
    }
  })

  afterEach((done) => {
    mongoose.disconnect()
    return done()
  })

  describe('CREATE', () => {
    it('can create a parking lot', async () => {
      const parking = new Parking({
        carBrand: 'bmw',
        licensePlate: '12-dfb-55',
        parkinglotId: '20',
        timeParkedAt: new Date()
      }).save(() => {
        parking.findOne({ licensePlate: '12-dfb-55' }, (err, results) => {
          expect(results.licensePlate).toEqual('12-dfb-55')
        })
      })
    })
  })
})
