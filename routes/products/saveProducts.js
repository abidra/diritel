const MODULE_ID = 'api:new-store'
const errors    = require('restify-errors')
const logger    = require('../../../utils/logger')
const mongoose  = require('mongoose')
const Store      = mongoose.model('stores');
const User      = mongoose.model('users');
const Product   = mongoose.model('products');

module.exports = async (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    const store = new Store({
        name: req.body.store_name,
        domain: req.body.store_domain,
        theme: req.body.theme,
        users: mongoose.Types.ObjectId(),
    });
    const user = new User({
        _id: store.users,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: new Date(),
    });
    try {
      await store.save();
      await user.save();
      res.send(store);
    } catch (err) {
      res.status(422).send(err);
    }
    // let resp = {}
    // if (!req.body.name) {
    //     resp = new errors.BadRequestError('Incomplete registration information.')
    // } else if (!req.body.role) {
    //     resp = new errors.BadRequestError('Incomplete registration information.')
    // } else {
    //     const jwt = require('jsonwebtoken')
    //     const token = jwt.sign(req.body, config.JWT_SECRET)

    //     // set all the input data as response and add the token
    //     resp = req.body
    //     resp['token']   = token

    //     logger.info('%s: token generated', MODULE_ID)
    // }

    // res.send(resp)

    // logger.info('%s: response sent', MODULE_ID)
    // return next()
}
