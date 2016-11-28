var User = require('../models/user');

module.exports = function (router) {

    router.route('/user/:id')
        .get(function (req, res) {
            User.findById(req.params.id, function(err, user){
                if(err || !user){
                    res.status(404);
                    res.send({
                        'message':'Post not found',
                        'err':err
                    });
                    return;
                }
                res.status(200);
                res.send({
                    'message':'OK',
                    'data':user
                });
            });
        })
        .put(function (req, res) {
            // TODO user might want to change password or something

        });

    return router;
};



