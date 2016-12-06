var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email:String,
    password: String,
    facebook:{
        id:String,
        token:String
    },
    posts:[String],
    history:[String]
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByEmail = function(email, callback){
    var query = {email:email};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.isValidPassword = function (pass, hash, next) {
    if(!hash){
        next(null, false);
    }
    else{
        bcrypt.compare(pass, hash, function (err, isMatch) {
            if (err) throw err;
            next(null, isMatch);
        });
    }
};