const MODULE_ID = 'api:home:v1'
const logger    = require('../../utils/logger')
const mongoose 	= require("mongoose");
const Store 	= mongoose.model('stores')

module.exports = async (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    const store = await Store.findById(req.user.stores, '-password');
    // get the user's name from the JWT
    (user)?res.send(user) : res.send("user not found")

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
