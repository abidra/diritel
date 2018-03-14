const MODULE_ID = 'api:users:v1'
const logger    = require('../../../utils/logger')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    // get the user's name from the JWT
    res.send({ hello: req.user.name,userId: req.params.userId, productId: req.params.productId })

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
