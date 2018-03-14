const MODULE_ID = 'api:home:v1'
const logger    = require('../../utils/logger')
const mongoose 	= require("mongoose");
const User 		= mongoose.model('users')

module.exports = async (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    const user = await User.findById(req.user.id, '-password');
    // get the user's name from the JWT
    (user)?res.send(user) : res.send("user not found")

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
