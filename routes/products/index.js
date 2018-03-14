const config = require("../../../../config");

module.exports = server => {
	server.get(
		{
			path: config.basePath("/users/:userId/products/"),
			version: "1.0.0"
		},
		require("./getAllProducts")
	);
	server.get(
		{
			path: config.basePath("/users/:userId/products/:productId"),
			version: "1.0.0"
		},
		require("./getProduct")
	);	
	server.put(
		{
			path: config.basePath("/users/:userId/products/:productId"),
			version: "1.0.0"
		},
		require("./getProduct")
	);
	server.del(
		{
			path: config.basePath("/users/:userId/products/:productId"),
			version: "1.0.0"
		},
		require("./getProduct")
	);			
};
