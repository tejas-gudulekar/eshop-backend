const express = require(`express`)
const morgan = require('morgan')
const mongoose = require('mongoose')
const categoryRoutes = require('./router/category')
require('dotenv/config')

const api_prefix = process.env.API_URL
const app = express()

//Middlewars
app.use(morgan(`tiny`))
app.use(express.json());
app.use(api_prefix + '/', categoryRoutes);

// Connect Mongodb
mongoose.connect( process.env.MONGODB_CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log(`Database Connected`))
    .catch( err =>  console.log('MongoConnectionError ' + err ))


// Start Server
app.listen(3000, () => {
    console.log(`App is listening on port 3000`)
})

