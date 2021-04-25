var main = require('./Backend/main');
main.startServer(8080);



var express = require('express');
var app = express();
var path = require('path');
app.use(express.static("Frontend/www"));
app.set("view engine", "ejs");
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Frontend/www/index.html'));
});

app.get("/testPage",function (req, res) {
    res.sendFile(__dirname+'/Frontend/www/testPage.html');
    res.sendFile(__dirname + '/Backend/data/TestData.json');
    
});

app.listen(8080);
