


module.exports = {
    test: function (callback, data) {
        const myModule = require('./index');
       // var result =null;
        //var data = JSON.parse(result);
        callback(null, myModule);
        
    }
};