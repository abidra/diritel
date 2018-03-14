const config = require("../../config");

module.exports = server => {
	server.post(
		{
			path: config.basePath("/register/account"),
			version: "1.0.0"
		},
		require("./v1")
	);
	server.post(
		{
			path: config.basePath("/login/account"),
			version: "1.0.0"
		},
		require("./v2")
	);
};
