
$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./test/TestMenu');
    var Test_List = require('./Templates').testList;

    console.log(Test_List);
    TestMenu.initialiseMenu();
});