module.exports = (server) => {
    // unprotected routes
    require('./ping')(server)
    require('./authentication')(server)

    // protected routes
    require('./home')(server)
    require('./admin')(server)
    require('./stores')(server)
    require('./users')(server)
}
