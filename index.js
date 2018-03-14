const MODULE_ID = 'app:main'
const config    = require('./config')
const logger    = require('./utils/logger')
const mongoose 	= require("mongoose");
const jwt       = require('restify-jwt-community')
require("./models");

logger.info('%s: initializing', MODULE_ID)

var restify = require('restify')
var plugins = require('restify').plugins

var server  = restify.createServer()
server.use(plugins.bodyParser())

//Mongo
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, config.MONGO_OPTION);

// Auth
var jwtConfig = {
    secret: config.JWT_SECRET
}

// secure all routes. except :
server.use(jwt(jwtConfig).unless({
    path: [
        config.basePath('/ping'),
        config.basePath('/register'),
        config.basePath('/login/account'),
        config.basePath('/register/account')
    ]
}))

// Routes
require('./routes')(server)

// Serve
server.listen(config.PORT)
logger.info('%s: ready. listening on PORT ', MODULE_ID, config.PORT)

module.exports = server

