const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()


const AuthRouter = require('./routes/AuthRouter')
const FeedRouter = require('./routes/FeedRouter')
const PORT = process.env.PORT || '3000'
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/auth', AuthRouter)
app.use('/feed', FeedRouter)
app.listen(PORT, () => console.log('Server running on port 3000'))