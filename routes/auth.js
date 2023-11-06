require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose')
let jwt = require('jsonwebtoken')
let router = express.Router()
let User = require('../schemas/User')

let conn = require('../db')

conn()


router.get('/users', async (req, res) => { 
    let token_header = process.env.JWT_HEADER
    let secret = process.env.JWT_SECRET_KEY

    try {
        const token = req.header(token_header)
        const verify = jwt.verify(token, secret)

        if(verify) {
            let users = await User.find({}).exec()
            res.send(users)
        }
        else{
            res.send("Unauthorized user")
        }
    }
    catch(err) {
        console.log(err)
    }

})


router.post('/sign-up', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let newUser = new User({
        username: username,
        password: password
    })

    newUser.save()
    .then(()=> {
        console.log("Login creado")
    }) 
    
})

router.post('/login', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let user = await User.findOne({username: username})
    if(!user) {
        res.send("User not found")
    }

    if(user.password != password) {
        res.send("Password don't match")
    }

    if(user.password === password) {
        let secret = process.env.JWT_SECRET_KEY
        let data = {
            username: user.username
        }
        const token = jwt.sign(data, secret)
        res.send(token)
    }

})

module.exports = router