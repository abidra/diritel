
// this will be used to prefix route paths.
// a workaround since restify does not have this yet
const API_ROOT  = '/api'

module.exports = {
	MONGO_URI	: "mongodb://abid:password@ds259778.mlab.com:59778/diritel",
	MONGO_OPTION: {
	  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
	},
    LOG_LEVEL   : process.env['LOG_LEVEL'] || 'info',
    PORT        : process.env['PORT'] || 8080,

    // key to generate/verify JWT
    JWT_SECRET  : 'some-secret',

    // will be used to building route paths
    basePath    : (path) => {
        return API_ROOT.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
    }

}
