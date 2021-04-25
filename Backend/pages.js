var path = require('path');
exports.getMainPage = function(req, res) {
    res.sendFile( path.join(__dirname,'..','/Frontend/www/index.html'));
};

exports.getTestPage = function(req,res) {
    res.sendFile( path.join(__dirname,'..','/Frontend/www/testPage.html'));
};