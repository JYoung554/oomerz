const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()


const AuthRouter = require('./routes/AuthRouter')
const PORT = process.env.PORT || '3000'
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/auth', AuthRouter)
app.listen(PORT, () => console.log('Server running on port 3000'))