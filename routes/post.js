var Post = require('../models/post');

module.exports = function (router) {

    router.route('/posts')
        .get(function (req, res) {
            var num_post = req.body.num_post || 1;

            // get num_post random posts
            Post.findRandom()
                .limit(num_post)
                .exec(function (err, posts) {
                    res.status(200);
                    res.send({
                        'message':'OK',
                        'data':posts
                    });
                });
        })
        .post(function (req, res) {
            // TODO do authentication here


        })
        .options(function (req, res) {
            res.writeHead(200);
            res.end();
        });

    router.route('/post/:id')
        .get(function (req, res) {
            Post.findById(req.params.id, function(err, post){
                if(err || !post){
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
                    'data':post
                });
            });
        })
        .put(function (req, res) {
            // TODO user might want to change text inside lantern
        })
        .delete(function (req, res) {

        });

    return router;
};



