module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('something working ^^')
  })

  app.use('/v1/parkinglots', require('./parkingLots'))
}
