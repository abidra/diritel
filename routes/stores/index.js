const config = require("../../config");

module.exports = server => {
	server.get(
		{
			path: config.basePath("/currentStore"),
			version: "1.0.0"
		},
		require("./getStore")
	);
	server.post(
		{
			path: config.basePath("/newStore"),
			version: "1.0.0"
		},
		require("./registerStore")
	);	
};
