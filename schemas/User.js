let mongoose = require('mongoose')
let { Schema } = mongoose

const user = new Schema({
    username: String,
    password: String,
})

let User = mongoose.model('users', user)

module.exports = User

