const socketIo = require('socket.io')
const logger = require('./logger')

module.exports = {
  registerServer
}

var io

function registerServer (server) {
  if (io) {
    throw new Error('listen can be called only once')
  }
  io = socketIo.listen(server)
  logger.trace(`Socket server listening`)
  io.on('connection', socket => {
    socket.on('disconnect', function () {
      console.log('user disconnected')
    })

    iparkCar()
  })
  return io
}

// setInterval(iparkCar, 2500);
function iparkCar () {
  console.log('send something')
  io.emit('parklot', {
    'carBrand': 'bmw',
    'licensePlate': 'nl-abc-33',
    'parkinglotId': '2',
    'timeParkedAt': '2018-08-26T10:53:30.832Z'
  })
}
