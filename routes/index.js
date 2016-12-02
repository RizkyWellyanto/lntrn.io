module.exports = function(app, router){
    app.use('/', require('./home.js')(router));
    app.use('/', require('./user.js')(router));
    app.use('/', require('./post.js')(router));
};

