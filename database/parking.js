const mongoose = require('mongoose')

const Schema = mongoose.Schema

// {carBrand;licensePlate;parkinglotId;timeParkedAt}

const ParkingSchema = new Schema({
  carBrand: String,
  licensePlate: String,
  parkinglotId: String,
  timeParkedAt: Date
})

ParkingSchema.index({ name: 'parkinglotIdIndex', parkinglotId: 1 })
ParkingSchema.index({ name: 'timeParkedAtIndex', timeParkedAt: 1 })

const Parking = mongoose.model('Parking', ParkingSchema)

module.exports = Parking
