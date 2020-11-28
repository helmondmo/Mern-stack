const express = require('express')
const app = express()
const router = require('./routes/api')
var bodyParser = require('body-parser')
const pharmacist = require('./models/pharmacist')
const mongoose = require('mongoose')

//connecting to database
mongoose.connect('mongodb+srv://mohamed:BRAQem1es1lS18rK@cluster0.wunki.mongodb.net/locum?retryWrites=true&w=majority', {useNewUrlParser: true})

//Establish connection
mongoose.connection.once('open', () => {
    console.log('we have established a connection.......')
}).on('error', error =>{
    console.log(error)
})

//serving up static files 
app.use(express.static('public'))


app.use(bodyParser.json())

//set up the routes 
app.use('/api', router)

//error handling middleware 
app.use((err, req, res, next) => {
   res.send(err.message)
})


//app listening on port....
app.listen(process.env.PORT || 3000, () => {
    console.log("listening for requests at port 3000...")
})