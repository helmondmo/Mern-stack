const express = require('express')
const router = express.Router()
const Pharmacist = require('../models/pharmacist')
const mongoose = require('mongoose')


// Retrieving a list of all the pharmacists 
router.get('/pharmacists', (req, res) => {
    Pharmacist.aggregate().near({
        near: { type: "point", coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)] },
        maxDistance: 10000,  // in 10k meters
        spherical: true,
        distanceField: "dist.calculated"
      }).then(function(pharmacists){
          console.log(pharmacists)
        res.send(pharmacists)
      })
})

// creating a new pharmacist 
router.post('/pharmacists', (req, res, next) => {
    Pharmacist.create(req.body).then((pharmacist) => {
        res.send(pharmacist)
    }).catch(error => {
        res.status(400)
        next(error)
    })
})


// Updating a pharmacist 
router.put('/pharmacists/:id', (req, res) => {
    Pharmacist.findByIdAndUpdate(req.params.id, req.body).then(() => {
        Pharmacist.findById(req.params.id).then((updatedPharmacist) => {
            res.send(updatedPharmacist)
        })
    })
})

//deleting a pharmacist 
router.delete('/pharmacists/:id', (req, res) => {
    Pharmacist.findByIdAndRemove(req.params.id).then((removedPharmacist)=> {
        res.send(removedPharmacist)
    })
})




module.exports = router