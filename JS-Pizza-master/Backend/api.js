/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var crypto    = require('crypto');




exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}
function base64(str)     {
    return new Buffer(str).toString('base64');
}

function calculateTotalSum(order_info) {
    let pizzas = order_info.pizzas;
    let sum = 0;
    for (let i = 0; i < pizzas.length;i++){
        if (pizzas[i].size === 'big_size'){
            sum += pizzas[i].pizza.big_size.price * pizzas[i].quantity;
        }
        else{
            sum += pizzas[i].pizza.small_size.price * pizzas[i].quantity;
        }
    }
    return sum;
}

function parse_order_info(order_info) {
    let str = '';
    let pizzas = order_info.pizzas;
    str += order_info.login + ", " + order_info.phoneNumber + ", " + order_info.address + "\n";
    for (let i = 0; i < pizzas.length;i++){
        str += pizzas[i].pizza.title + "(" + pizzas[i].size + ")" + "\n";
    }
    return str;
}

exports.createOrder = function(req, res) {
    var order_info = req.body;
    let sum = calculateTotalSum(order_info);
    let description = parse_order_info(order_info);
    var order    =    {
        version:    3,
        public_key:    'sandbox_i45750811690',
        action:    "pay",
        amount:    sum,
        currency:    "UAH",
        description: description,
        order_id:    Math.random(),
        sandbox:    1
    };
    var data    =    base64(JSON.stringify(order));
    var signature    =    sha1('sandbox_E7AMAeTrG2YmUv7XP2ArVOZU45ohkb8EZ05QIzZr' +    data +    'sandbox_E7AMAeTrG2YmUv7XP2ArVOZU45ohkb8EZ05QIzZr');
    var receipt = {
        data: data,
        signature: signature
    }
    res.send(receipt);
};

