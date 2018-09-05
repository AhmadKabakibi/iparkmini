const csv = require('csv-parser')
const fs = require('fs')
const assert = require('assert')
const db = require('../../../database')
const parkingLotsService = require('../../services')
const path = require('path')

db.connect('localhost')

module.exports = {
  csvLoader (fileName, options = {}) {
    // Generate an AssertionError to if the file name is not passed as arg
    assert(fileName, 'fileName is required')
    const defaults = {
      separator: ';', // specify optional cell separator
      newline: '\n', // specify a newline character
      strict: true // require column length match headers length
    }

    fs.createReadStream(path.join(__dirname, '../../../resources/' + fileName))
      .pipe(csv(Object.assign({}, defaults, options)))
      .on('data', function (data) {
        // TODO Validate input before saving
        parkingLotsService.create({
          carBrand: data.carBrand,
          licensePlate: data.carBrand.licensePlate,
          parkinglotId: data.carBrand.parkinglotId,
          timeParkedAt: data.carBrand.timeParkedAt
        }).then((results) => {
          console.log('Brand: %s licensePlate: %s', data.carBrand, data.licensePlate)
        }).catch((error) => {
          db.disconnect()
          console.log(error)
        })
      })
      .on('end', function () {
        console.log('done file parsing')
      })
  }
}