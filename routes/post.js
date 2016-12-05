var Post = require('../models/post');

module.exports = function (router) {
    router.route('/posts')
        .get(function (req, res) {
            console.log("requesting all posts");
            var num_post = req.body.num_post || 1;

            // get all posts
            Post.getAllPosts(function (err, posts) {
                if(err || posts.length == 0){
                    res.status(400);
                    res.send({
                        'message':'Could not fetch any posts',
                        'error':err
                    });
                }
                else{
                    res.status(200);
                    res.send({
                        'message': 'OK',
                        'data': posts
                    });
                }
            });
        })
        .post(isLoggedIn,
            function (req, res) {
                // console.log("passed log in");
                req.checkBody('text', 'Text content is required').notEmpty();

                var newPost = new Post();
                newPost.text = req.body.text;
                newPost.save(function (err) {
                    if(err){
                        res.status(400);
                        res.send({
                            'message':'error',
                            'error':err
                        });
                    }
                    else{
                        res.status(201);
                        res.send({
                            'message':'OK',
                            'data':newPost
                        });
                    }
                });
            })
        .options(function (req, res) {
            res.writeHead(200);
            res.end();
        });
    router.route('/post/:id')
        .get(function (req, res) {
            console.log("using the post id API");
            Post.findById(req.params.id, function (err, post) {
                if (err || !post) {
                    res.status(404);
                    res.send({
                        'message': 'Post not found',
                        'err': err
                    });
                    return;
                }
                res.status(200);
                res.send({
                    'message': 'OK',
                    'data': post
                });
            });
        })
        .delete(function (req, res) {
            Post.getPostById(req.params.id, function(err, post){
                if(err || !post){
                    res.status(404);
                    res.send({
                        'message':'Unable to get lantern'
                    });
                }
                else{
                    Post.deletePostById(req.params.id, function(err, post){
                        if (err || !pot) {
                            res.status(404);
                            res.send({
                                'message': 'Lantern failed to be deleted',
                                'err': err
                            });
                        }
                        else{
                            res.status(200);
                            res.send({
                                'message': 'Lantern successfully deleted!',
                                'data': post
                            });
                        }
                    });
                }
            });
        });

    return router;
};

// ideally this should be refactored into it's own file. i'm too tired
// connect-style funct to check whether user is logged in. can act as middleware
var isLoggedIn = function (req, res, next) {
    var authenticationState = req.isAuthenticated();
    console.log("authenticationState (before): ", authenticationState);
    authenticationState = true;
    console.log("authenticationState (after): ", authenticationState);
    if (authenticationState) {
        return next();
    }
    else {
        res.status(500);
        res.send({
            'error_msg': 'You are not logged in'
        });
    }
};
