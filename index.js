const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Experimenting with the CORS options
const whitelist = ['http://10.0.0.221:3000', 'http://localhost:3000']
const methods = [ 'GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE' ]
const corsOptions = {
    // origin: whitelist,
    origin: '*',
    methods: methods,
    preflightContinue: true,
    allowedHeaders: 'Content-Type'
}
const app = express()
app.use(cors(corsOptions))
app.use(function(req, res, next) {
    next()
})

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const roleRouter = require('./db/routes/role-router')
const titleRouter = require('./db/routes/title-router')
const accountRouter = require('./db/routes/account-router')
const siteRouter = require('./db/routes/site-router')
const buildingRouter = require('./db/routes/building-router')
const floorRouter = require('./db/routes/floor-router')
const unitRouter = require('./db/routes/unit-router')
const roomRouter = require('./db/routes/room-router')
const userRouter = require('./db/routes/user-router')
const adminRouter = require('./db/routes/admin-router')
const vendorRouter = require('./db/routes/vendor-router')
const featureRouter = require('./db/routes/feature-router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', roleRouter, titleRouter, accountRouter, siteRouter, buildingRouter)
app.use('/api', floorRouter, unitRouter, roomRouter, userRouter, adminRouter)
app.use('/api', vendorRouter, featureRouter)

function error(err, req, res, next) {
    console.error(err.stack);
  
    // respond with 500 "Internal Server Error".
    res.status(500);
    res.send('Internal Server Error');
}

// This overrides the default error handler, and must be called _last_ on the app
app.use(error);

const apiPort = 3001
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
