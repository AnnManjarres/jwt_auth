let mongoose = require('mongoose')
require('dotenv').config()

function connectMongo() {
    mongoose.connect(process.env.MONGO_STREAM).then(() => {console.log("connected")}).catch((err) => {console.log(err)})
}

module.exports = connectMongo