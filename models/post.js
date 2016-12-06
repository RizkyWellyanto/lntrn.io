var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

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
    // pre-processing to make sure a string array and int are passed to mongo
    // default empty list, else convert to ObjectId of the string or the array
    var read = [];
    if (typeof config.read === 'string')
        read = [ObjectId(config.read)];
    if (typeof config.read === 'object' && config.read.length > 0)
        read = config.read.map(function(id) {return ObjectId(id);});

    var quantity = parseInt(config.qty);

    // Mongo aggregate call. Gets posts that have not been read in the array config.qty and returns a random set ($sample) of size config.qty
    Post.aggregate([{$match: {_id: {$nin: read}}}, {$sample: {size: quantity}}], callback);
};

module.exports.getUserHistory = function(config, callback) {
  Post.find(config, callback);
};

module.exports.getUserPosts = function(config, callback) {

};