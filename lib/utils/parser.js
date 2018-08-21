const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

const stream = csv({
  separator: ';', // specify optional cell separator
  newline: '\n', // specify a newline character
  strict: true // require column length match headers length
})

fs.createReadStream(path.join(__dirname, '../../resources/cars.csv'))
  .pipe(stream)
  .on('data', function (data) {
    console.log('Brand: %s licensePlate: %s', data.carBrand, data.licensePlate)
  })
