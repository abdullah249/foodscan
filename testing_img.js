var fs = require('fs')
  , path = require('path')
  , http = require('http')
  , request = require('request');


request
  .get('https://weightchoper.somee.com/images/Apple_pie_resized.jpg')
  .on('error', function(err,response) {
    console.error(err)
	console.log(response.statusCode)
  })
  .pipe(fs.createWriteStream('image.jpg'))