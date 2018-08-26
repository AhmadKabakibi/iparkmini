const io = require('socket.io-client')
const http = require('http')
const ioBack = require('socket.io')

let socket
let httpServer
let httpServerAddr
let ioServer

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = http.createServer().listen()
  httpServerAddr = httpServer.listen().address()
  ioServer = ioBack(httpServer)
  done()
})

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close()
  httpServer.close()
  done()
})

/**
 * Run before each test
 */
beforeEach((done) => {
  // Setup
  // square brackets are used for IPv6
  socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket']
  })
  socket.on('connect', () => {
    done()
  })
})

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect()
  }
  done()
})

describe('basic socket.io', () => {
  test('should communicate', (done) => {
    // once connected, emit New Iparkmini
    ioServer.emit('echo', 'New Iparkmini')
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('New Iparkmini')
      done()
    })
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined()
    })
  })
})
