require('dotenv').config()
let express = require('express')
let routes = require('./routes/auth')

let app = express()
let port = process.env.PORT

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
}) 
