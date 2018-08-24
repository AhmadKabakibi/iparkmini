const errorHandling = require('../utils/error-handling')
const responseHandling = require('../utils/response-handler')
const validateRequest = require('../utils/validate-request')
const parkingLotsService = require('../services')
const parkingLotsRouter = require('express').Router()

parkingLotsRouter.route('/:id/car')
  .post((req, res) => {
    validateRequest(req, {
      'carBrand': { in: 'body', notEmpty: true },
      'licensePlate': { in: 'body', notEmpty: true },
      'id': { in: 'params', notEmpty: true },
      'timeParkedAt': { in: 'body', notEmpty: true }
    }).then(() => {
      parkingLotsService.create({
        carBrand: req.body.carBrand,
        licensePlate: req.body.licensePlate,
        parkinglotId: req.params.id,
        timeParkedAt: req.body.timeParkedAt
      })
    })
      .then(result => responseHandling.success(res, result))
      .catch(errorHandling.catchAndRespond(req, res))
  })

module.exports = parkingLotsRouter
