const MODULE_ID = "api:login";
const logger = require("../../utils/logger");
const config = require("../../config");
const errors = require("restify-errors");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  logger.info("%s: request received", MODULE_ID);
  let resp = {};
  if (!req.body || !req.body.email || !req.body.password) {
    resp = {
      status: "error",
      type: req.body.type,
      message: "Incomplete login information."
    };
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        //Is Password valid? 
        if (!passwordIsValid) {
          res.send({
            status: "error",
            type: req.body.type,
            message: "Login failed."
          });
        }
        //Send Token if Password Valid
        const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
        resp = {
          status: "ok",
          type: req.body.type,
          currentAuthority: "admin",
          token
        };
        logger.info("%s: token generated", MODULE_ID);
      } else {
        resp = {
          status: "error",
          type: req.body.type,
          message: "Login failed."
        };
      }
    } catch (err) {
      res.status(422).send(err);
    }
  }

  res.send(resp);

  logger.info("%s: response sent", MODULE_ID);
  return next();
};
