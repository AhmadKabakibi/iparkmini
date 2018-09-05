const startTimer = require('../middlewares/timer')

module.exports = (app) => {
  app.get('/', startTimer, (req, res) => {
    res.json({ 'message': 'Welcome to API iparkmini.', 'version': '1.0.0' })
  })

  app.use('/v1/parkinglots', require('./parkingLots'))
}
