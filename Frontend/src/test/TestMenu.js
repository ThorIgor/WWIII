
var API = require(('../API'))
var Templates = require('../Templates');
var path = require("path");
var resultPath = "../../../Backend/results/";
var Test_List = [];

var popular_tests_block = $(".popular-tests");
var all_tests_block = $(".all-tests");


function filterPopular(list) {
    var popular_list = [];
    list.forEach(function (test) {
        if(test.popular === true)
            popular_list.push(test);
    });
    return popular_list;
}

function getTestCallback(req, res) {
    var $content = $("#test-block");
    $(".block1")[0].style.display ="none";
    $(".block3")[0].style.display ="none";


    Survey.StylesManager.applyTheme("modern");

    $content.html("<div class=\"test-field\">\n" +
        "   <div id=\"surveyElement\" style=\"display:inline-block;width:100%;\"></div>\n" +
        "   <div id=\"surveyResult\"></div>\n" +
        "</div>\n");

    window.survey = new Survey.Model(res);

    survey.onComplete.add(function (result) {
        var result = require("../../../Backend/results/BrawlStarsTest.js");
        $("#surveyResult").html(result.resultHTML(survey.data));
    });

    $content.find("#surveyElement").Survey({model: survey});
}

function showTests(all_list) {
    $("#test-block").html("");
    $(".block1")[0].style.display ="block";
    $(".block3")[0].style.display ="block";

    var popular_list = filterPopular(all_list);

    popular_tests_block.html("");
    all_tests_block.html("");

    function showPopularTest(test) {
        var html_code = Templates.PopularTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest(test.id, getTestCallback);
        });

        popular_tests_block.append(node);
    }

    function showAllTest(test) {
        var html_code = Templates.DefaultTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest(test.id, getTestCallback);
        });

        all_tests_block.append(node);
    }

    popular_list.forEach(showPopularTest);
    all_list.forEach(showAllTest);
}

function showSearchTests(list) {
    $("#test-block").html("");
    $(".block1")[0].style.display ="none";
    $(".block3")[0].style.display ="block";

    all_tests_block.html("");

    function showTest(test) {
        var html_code = Templates.DefaultTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest(test.id, getTestCallback);
        });

        all_tests_block.append(node);
    }

    list.forEach(showTest);
}

function initialiseMainPage() {
    API.getTestList(function(req, res) {
        if(req === null) {
            Test_List = JSON.parse(res);
            showTests(Test_List);
        }
        else
            console.log(req);
    });
}

$("#search-button").click(function() {
    API.getSearchTestList($("#search-input").val(), function(req, res) {
        if(req === null) {
            Test_List = res;
            showSearchTests(Test_List);
        }
        else
            console.log(req);
    });
});

$("#mainPage").click(function() {
    initialiseMainPage();
});

exports.initialiseMainPage = initialiseMainPage;
