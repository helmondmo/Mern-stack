const mongoose = require('mongoose')

/*
"geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
*/

const GeoSchema = new mongoose.Schema({
    type: {type: String ,default: "Point"},
    coordinates: {type: [Number], index: '2dsphere'}
})

//creating a schema 
const pharmacistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    number: {type: Number, required: true},
    availability: {type: Boolean, default: false},
    geometry: GeoSchema
})

//creating a model 

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema)

module.exports = Pharmacist