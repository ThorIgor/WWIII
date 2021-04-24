var mainPage = require('/Frontend/www/index.html');
var testPage = require('/Frontend/www/testPage.html');

exports.getMainPage = function(req, res) {
    res.send(mainPage);
};

exports.getTestPage = function(req,res) {
    res.send(testPage);
};