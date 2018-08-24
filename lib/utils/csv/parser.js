const csv = require('csv-parser')
const fs = require('fs')
const assert = require('assert')
const db = require('../../../database')
const path = require('path')

db.start()

module.exports = {
  csvLoader (fileName, options = {}) {
    // Generate an AssertionError to if the file name is not passed as arg
    assert(fileName, 'fileName to load is required')
    const defaults = {
      separator: ';', // specify optional cell separator
      newline: '\n', // specify a newline character
      strict: true // require column length match headers length
    }

    fs.createReadStream(path.join(__dirname, '../../../resources/' + fileName))
      .pipe(csv(Object.assign({}, defaults, options)))
      .on('data', function (data) {
        // create car model
        console.log('Brand: %s licensePlate: %s', data.carBrand, data.licensePlate)
      })
      .on('end', function () {
        db.stop()
        console.log('connection closed done')
      })
  }
}
