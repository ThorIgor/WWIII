
var Test_List = require('./data/Test_List');
var crypto    = require('crypto');

exports.getTestList = function(req, res) {
    res.send(Test_List);
};

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function base64(str)     {
    return new Buffer(str).toString('base64');
}