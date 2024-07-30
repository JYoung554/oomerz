const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const AppRouter = require('./routes/index')
const AuthRouter = require('./routes/AuthRouter')
const TriviaRouter = require('./routes/TriviaRouter')
const ProfileRouter = require('./routes/ProfileRouter')


const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  })
}

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', AppRouter)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
