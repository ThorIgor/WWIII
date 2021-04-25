
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
    backendGet("/testPage/getAllTests/", callback);
}

exports.getTest = function(id, callback) {
    backendGet("/testPage/getTest?testName=" + id, callback);
}

exports.getSearchTestList = function(searchInput, callback) {
    backendGet("/search?search_query=" + searchInput, callback);
}
