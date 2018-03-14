const MODULE_ID = 'api:new-store'
const errors    = require('restify-errors')
const logger    = require('../../utils/logger')
const config    = require("../../config");
const mongoose  = require('mongoose')
const jwt       = require("jsonwebtoken");
const bcrypt    = require("bcryptjs");
const md5       = require('md5');
const Store     = mongoose.model('stores');
const User      = mongoose.model('users');
const Product   = mongoose.model('products');

module.exports = async (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    let resp = {};
    if (!req.body.name || !req.body.email || !req.body.password) {
      resp = new errors.BadRequestError("Incomplete registration information.");
    } else if (await User.findOne({ email: req.body.email })) {
      resp = new errors.BadRequestError("User already registered.");
    } else {
    //Hash password  with bcrypt
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    //Schema for User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        prefix: req.body.prefix,
        phone: req.body.phone,
        avatar: "https://gravatar.com/avatar/"+md5(req.body.email),
        password: hashedPassword,
        date: new Date(),
    });
    try {
      //Save to database
      await user.save();
    } catch (err) {
      res.status(422).send(err);
    }
    //Generate Token
    const token = jwt.sign(user.id, config.JWT_SECRET);
    //Send Response
    resp = {
      status: "ok",
      type: req.body.type,
      currentAuthority: "super_user",
      token
    };
    logger.info("%s: token generated", MODULE_ID);
  }
  res.send(resp);

  logger.info("%s: response sent", MODULE_ID);
  return next();
}
