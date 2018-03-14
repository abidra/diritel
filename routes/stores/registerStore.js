const MODULE_ID = "api:stores:register";
const mongoose = require("mongoose");
const Store = mongoose.model("stores");
const User = mongoose.model("users");
const grantsObject = require("../../utils/grantsObject");
const AccessControl = require("accesscontrol");
const ac = new AccessControl(grantsObject);

module.exports = async (req, res, next) => {
	logger.info("%s: request received", MODULE_ID);
	let resp = {};
	const user = await User.findById(req.user.id);
	//If Store found
	if (user.stores) {
		resp = {
			type: "error",
			message: "You've create Store",
			description: "You can't create more than 1 Store in 1 Account Super User"
		};
	} else {
		//Check permission
		const permission = ac.can(req.user.role).createAny("store");
		if (permission.granted) {
			//Schema for Store
			const store = new Store({
				name: req.body.store_name,
				domain: req.body.store_domain,
				theme: req.body.theme,
				users: req.user.id
			});
	    try {
	      //Save to database
	      resp = await store.save();
	    } catch (err) {
	      res.status(422).send(err);
	    }			
		} else {
			// resource is forbidden for this user/role
			resp = {
				type: "error",
				message: "Permission Denied",
				description: "Only Super User can create Store"
			};
		}
	}
	res.send(resp);
	logger.info("%s: response sent", MODULE_ID);
	return next();
};
