const errorHandling = require('../utils/error-handling')
const responseHandling = require('../utils/response-handler')
const validateRequest = require('../utils/validate-request')
const parkingLotsService = require('../services')
const parkingLotsRouter = require('express').Router()
const startTimer = require('../middlewares/timer')

parkingLotsRouter.route('/:id/car')
  .post(startTimer, (req, res) => {
    validateRequest(req, {
      'carBrand': { in: 'body',
        notEmpty: true
      },
      'licensePlate': { in: 'body',
        notEmpty: true
      },
      'id': { in: 'params',
        notEmpty: true
      },
      'timeParkedAt': { in: 'body',
        notEmpty: true
      }
    }).then(() => {
      return parkingLotsService.create({
        carBrand: req.body.carBrand,
        licensePlate: req.body.licensePlate,
        parkinglotId: req.params.id,
        timeParkedAt: req.body.timeParkedAt
      })
    })
      .then(result => responseHandling.success(res, result))
      .catch(errorHandling.catchAndRespond(req, res))
  })

parkingLotsRouter.route('/:id/cars/:t')
  .get(startTimer, (req, res) => {
    validateRequest(req, {
      'id': { in: 'params',
        notEmpty: true
      },
      't': { in: 'params',
        notEmpty: true
      },
      'startTime': { in: 'params',
        notEmpty: true
      }
    }).then(() =>
      parkingLotsService.find({
        parkinglotId: req.params.id,
        t: req.params.t,
        startTime: req.params.startTime
      }, res, result => {
        responseHandling.success(res, result)
      })
    ).catch(errorHandling.catchAndRespond(req, res))
  })
module.exports = parkingLotsRouter
