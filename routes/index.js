module.exports = function(app, router){
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./user.js')(router));
    app.use('/api', require('./post.js')(router));
    app.use('/api', require('./auth.js')(router));
};

