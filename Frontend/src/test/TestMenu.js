
var API = require(('../API'))
var Templates = require('../Templates');
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
    var $content = $(".content");

    Survey.StylesManager.applyTheme("modern");

    $content.html("<div class=\"test-block\">\n" +
        "            <div class=\"test-field\">\n" +
        "                <div id=\"surveyElement\" style=\"display:inline-block;width:100%;\"></div>\n" +
        "                <div id=\"surveyResult\"></div>\n" +
        "            </div>\n" +
        "        </div>");

    window.survey = new Survey.Model(res);

    survey.onComplete.add(function (result) {
        document.querySelector('#surveyResult').textContent =
            "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

    $content.find("#surveyElement").Survey({model: survey});
}

function showTests(all_list) {
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
    $(".block1")[0].display = "none";

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

exports.initialiseMainPage = initialiseMainPage;
