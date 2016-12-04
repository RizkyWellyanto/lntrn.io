var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    text: String
});

var Post = module.exports = mongoose.model('Post', postSchema);

module.exports.getPostById = function (id, callback) {
    Post.findById(id, callback);
};

module.exports.deletePostById = function (id, callback) {
    var query = {
        _id: id
    };
    Post.remove(query, callback);
};

module.exports.getAllPosts = function (callback) {
    Post.find({}, callback);
};