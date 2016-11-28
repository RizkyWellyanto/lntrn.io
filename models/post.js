var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model('Post', postSchema);
