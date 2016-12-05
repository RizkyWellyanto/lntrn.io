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

module.exports.getRandomPosts = function (config, callback) {
    // Mongo aggregate call. Gets posts that have not been read in the list config.qty and returns a random set ($sample) of size config.qty
    Post.aggregate([{$match: { text: {$nin: config.read}}}, {$sample: {size: parseInt(config.qty)}}], callback);
};