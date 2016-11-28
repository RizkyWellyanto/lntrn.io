var passport = require('passport');

module.exports = function (router){

    router.route('/login')
        .post(function(req, res){
            // TODO user authentication
        });

    router.route('/logout')
        .get(function (req, res) {
            // TODO log out
        });

    return router;
};



