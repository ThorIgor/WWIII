/**
 * Created by chaika on 09.02.16.
 */
var Test_List = require('./data/Test_List');

exports.getTestList = function(req, res) {
    res.send(Test_List);
};