var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var lambda = new AWS.Lambda();
var fs = require('fs');

var params = {
    FunctionName: 'foodscanner',
    ZipFile:  fs.readFileSync('./food_scan_n.rar')
}

lambda.updateFunctionCode(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
});