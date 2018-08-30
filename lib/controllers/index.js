module.exports = function (app) {
  app.get('/', function (req, res) {
    res.json({ 'message': 'Welcome to API iparkmini.', 'version': '1.0.0' })
  })

  app.use('/v1/parkinglots', require('./parkingLots'))
}
