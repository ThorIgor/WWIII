const fs = require('fs');
var path = require('path');

exports.sendTest= function(req, res) {
    res.json(req.params['testName']);
};


function getTest(name)
{
    try{return JSON.parse(fs.readFileSync(path.join(__dirname,'/data/' ,name, '.json')); }
    catch{}
    return 0;
}
                          
                          
