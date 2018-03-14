const MODULE_ID = 'api:users:v1'
const logger    = require('../../../../utils/logger')
const mongoose	= require('mongoose')
const Shop 		= mongoose.model('stores');
const User 		= mongoose.model('users');
const Product 	= mongoose.model('products');

module.exports = async (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    const shop = await Shop.find({_id: req.user._shop}).populate({path: 'threads', populate: {path: 'messages'}});
    const products = await Product.find({'_user': user.id});
    // get the user's name from the JWT
    res.send({ hello: req.user.name,yourid: req.params.userId })

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
