////module.exports = {
////    test: function (callback, res) {
//import * as tf from '@tensorflow/tfjs';
const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const handler = tfn.io.fileSystem("jsModel/model.json");
const model = tf.loadLayersModel(handler);
const jpeg = require('jpeg-js');
var sleep = require('system-sleep');
var express = require('express');
var app = express();
var fs = require("fs");

var fs= require('fs')
  ,path = require('path')
  , http = require('http')
  , request = require('request');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/foodscan', function (req, res) {
  
let globalpred='none'
async function imageapi() {
  
request
  .get('https://weightchoper.somee.com/images/Apple_pie_resized.jpg')
  .on('error', function(err,response) {
    console.error(err)
	console.log(response.statusCode)
  })
  .pipe(fs.createWriteStream('image.jpg'))
 
}
imageapi()
sleep(3000);

const NUMBER_OF_CHANNELS = 3
const batch_size = 1
classes = ['apple_pie',
    'baby_back_ribs',
    'baklava',
    'beef_carpaccio',
    'beef_tartare',
    'beet_salad',
    'beignets',
    'bibimbap',
    'bread_pudding',
    'breakfast_burrito',
    'bruschetta',
    'caesar_salad',
    'cannoli',
    'caprese_salad',
    'carrot_cake',
    'ceviche',
    'cheesecake',
    'cheese_plate',
    'chicken_curry',
    'chicken_quesadilla',
    'chicken_wings',
    'chocolate_cake',
    'chocolate_mousse',
    'churros',
    'clam_chowder',
    'club_sandwich',
    'crab_cakes',
    'creme_brulee',
    'croque_madame',
    'cup_cakes',
    'deviled_eggs',
    'donuts',
    'dumplings',
    'edamame',
    'eggs_benedict',
    'escargots',
    'falafel',
    'filet_mignon',
    'fish_and_chips',
    'foie_gras',
    'french_fries',
    'french_onion_soup',
    'french_toast',
    'fried_calamari',
    'fried_rice',
    'frozen_yogurt',
    'garlic_bread',
    'gnocchi',
    'greek_salad',
    'grilled_cheese_sandwich',
    'grilled_salmon',
    'guacamole',
    'gyoza',
    'hamburger',
    'hot_and_sour_soup',
    'hot_dog',
    'huevos_rancheros',
    'hummus',
    'ice_cream',
    'lasagna',
    'lobster_bisque',
    'lobster_roll_sandwich',
    'macaroni_and_cheese',
    'macarons',
    'miso_soup',
    'mussels',
    'nachos',
    'omelette',
    'onion_rings',
    'oysters',
    'pad_thai',
    'paella',
    'pancakes',
    'panna_cotta',
    'peking_duck',
    'pho',
    'pizza',
    'pork_chop',
    'poutine',
    'prime_rib',
    'pulled_pork_sandwich',
    'ramen',
    'ravioli',
    'red_velvet_cake',
    'risotto',
    'samosa',
    'sashimi',
    'scallops',
    'seaweed_salad',
    'shrimp_and_grits',
    'spaghetti_bolognese',
    'spaghetti_carbonara',
    'spring_rolls',
    'steak',
    'strawberry_shortcake',
    'sushi',
    'tacos',
    'takoyaki',
    'tiramisu',
    'tuna_tartare',
    'waffles'];

function mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [], count = [], i, number, maxIndex = 0;

    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }

    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }

    return modes;
}

const readImage = path => {
    const buf = fs.readFileSync(path)
    const pixels = jpeg.decode(buf, true)
    return pixels
}
const imageByteArray = (image, numChannels) => {
    const pixels = image.data
    const numPixels = image.width * image.height;
    const values = new Uint8Array(numPixels * numChannels);

    for (let i = 0; i < numPixels; i++) {
        for (let channel = 0; channel < numChannels; ++channel) {
            values[i * numChannels + channel] = pixels[i * 4 + channel];
        }
    }
    return values
}

const imageToInput = (image, numChannels) => {
    const values = imageByteArray(image, numChannels)
    //console.log(values);
    const outShape = [batch_size,image.height, image.width, numChannels];
    const input = tf.tensor4d(values, outShape, 'float32');

    return input
}
const b = tf.scalar(127.5)
const c = tf.scalar(1);

const image = readImage('image.jpg')//input image 
const input = imageToInput(image, NUMBER_OF_CHANNELS)
//flippedImg = tf.image.flipLeftRight(input)
flippedImg = input.reverse(1)
//console.log(input.shape,flippedImg.shape)
crop_input = input.resizeNearestNeighbor([512,512])
flippedImg2 = flippedImg.resizeNearestNeighbor([512,512])
const size = crop_input.shape
const size2 = flippedImg2.shape

const rect = {
    x: 0 ,
    y: 0,
    x1: size[1],
    y1: size[2],
    x2: size[1],
    y2: 0,
    x3: 0,
    y3: size[2],
    x4: size[1]/2,
    y4: size[2]/2,
    w: 299,
    h: 299
}
const rect2 = {
    x: 0 ,
    y: 0,
    x1: size[1],
    y1: size[2],
    x2: size[1],
    y2: 0,
    x3: 0,
    y3: size[2],
    x4: size[1]/2,
    y4: size[2]/2,
    w: 299,
    h: 299
}


const cropped = tf.image.cropAndResize(crop_input, [[rect.y/size[2], rect.x/size[1], (rect.y+rect.h)/size[2], (rect.x+rect.w)/size[1]],[rect.y1/size[2], rect.x1/size[1], (rect.y1-rect.h)/size[2], (rect.x1-rect.w)/size[1]],[rect.y2/size[2], rect.x2/size[1], (rect.y2+rect.h)/size[2], (rect.x2-rect.w)/size[1]],[rect.y3/size[2], rect.x3/size[1], (rect.y3-rect.h)/size[2], (rect.x3+rect.w)/size[1]],[rect.y4/size[2], rect.x4/size[1], (rect.y4+rect.h)/size[2], (rect.x4+rect.w)/size[1]]], [0,0,0,0,0], [rect.h, rect.w]);
const cropped2 = tf.image.cropAndResize(flippedImg2, [[rect2.y/size2[2], rect2.x/size2[1], (rect2.y+rect2.h)/size2[2], (rect2.x+rect2.w)/size2[1]],[rect2.y1/size2[2], rect2.x1/size2[1], (rect2.y1-rect2.h)/size2[2], (rect2.x1-rect2.w)/size2[1]],[rect2.y2/size2[2], rect2.x2/size2[1], (rect2.y2+rect2.h)/size2[2], (rect2.x2-rect2.w)/size2[1]],[rect2.y3/size2[2], rect2.x3/size2[1], (rect2.y3-rect2.h)/size2[2], (rect2.x3+rect.w)/size2[1]],[rect2.y4/size2[2], rect2.x4/size2[1], (rect2.y4+rect2.h)/size2[2], (rect2.x4+rect2.w)/size2[1]]], [0,0,0,0,0], [rect.h, rect.w]);
const croppedNew = cropped.concat(cropped2)
//console.log(croppedNew.shape)
//console.log(cropped2.shape)

//resized_input = input.resizeNearestNeighbor([299,299])
resized_input = input.resizeBilinear([299,299]);
const input_divided = croppedNew.div(b);
const input_sub = input_divided.sub(c);
//console.log(input_sub.shape)
//console.log(input.shape);


        
   
predictionClass = model.then(function (res) {
    //const example = tf.browser.fromPixels('Apple_pie_resized.jpg');
    const prediction = res.predict(input_sub);
    console.log('Predicted')
    //prediction.print()
    const predictionIdx = tf.argMax(prediction, 1).arraySync();
    console.log(predictionIdx)
    modePred = mode(predictionIdx)
    console.log(modePred)
    predictionClass = classes[modePred[0]]
	globalpred=predictionClass
    global.predict = predictionClass ;
	console.log(globalpred);
    //console.log(predictionIdx);
    //callback(null, JSON.parse(predictionClass));
	//console.log(globalpred);//output result
    //console.log(predictionClass);//output result
    //model.exports.predictionClass =  predictionClass;
    //console.log(prediction);
}, function (err) {
    console.log(err);
});
sleep(1000);
console.log(globalpred);

const variableName = 'variableValue';
module.exports = variableName;
//    }
//};

console.log(globalpred);
res.json( JSON.stringify(globalpred));
})

PORT=process.env.PORT || 5000
var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

