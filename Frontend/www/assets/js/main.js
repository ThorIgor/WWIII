/**
 * Created by chaika on 09.02.16.
 */
var API_URL = "http://localhost:8080";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getTestList = function(callback) {
    backendGet("/api/get-test-list", callback);
}

exports.getTest = function(url, callback) {
    backendGet(url, callback);
}


$(function(){
    //This code will execute when the page is ready
    var TestMenu = require('./test/TestMenu');
    var Test_List = require('./Templates').testList;

    console.log(Test_List);
    TestMenu.initialiseMenu();
});
/**
 * Created by chaika on 02.02.16.
 */
var fs = require('fs');
var ejs = require('ejs');


exports.PopularTest = ejs.compile(fs.readFileSync('./Frontend/templates/PopularTest.ejs', "utf8"));
exports.DefaultTest = ejs.compile(fs.readFileSync('./Frontend/templates/DefaultTest.ejs', "utf8"));

exports.testList = fs.readdirSyc("../../Backend/data/");

var API = require(('../API'))
var Templates = require('../Templates');
var Test_List = Templates.testList;


var popular_tests_block = $(".block1");
var all_tests_block = $(".block3");

function filterPopular(list) {
    var popular_list = [];
    list.forEach(function(val) {
       if(val.popular === true)
           popular_list.push(val);
    });
    return popular_list;
}

function showTests(all_list) {
    var popular_list = filterPopular(all_list);

    popular_tests_block.html("");
    all_tests_block.html("");

    function showPopularTest(test) {
        var html_code = Templates.PopularTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest("/test/" + test.filename);
        });

        popular_tests_block.append(node);
    }

    function showAllTest(test) {
        var html_code = Templates.DefaultTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest("/test/" + test.filename);
        });

        all_tests_block.append(node);
    }

    popular_list.forEach(showPopularTest);
    all_list.forEach(showAllTest);
}

function initialiseMainPage() {
    showTests(Test_List);
}



module.exports = initialiseMainPage();

