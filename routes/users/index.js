const config = require("../../config");

module.exports = server => {
	server.get(
		{
			path: config.basePath("/currentUser"),
			version: "1.0.0"
		},
		require("./getUser")
	);
};
