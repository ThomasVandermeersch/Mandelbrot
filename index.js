const bodyParser = require('body-parser');

var isInMandelbrot = require('./mandelbrot.js');
var express = require('express');
const delay = require('delay');
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));



app.get('/inMandelbrot/:real/:imag', async function (req, res) {
    await delay(10000)
    a = isInMandelbrot.isInMandelbrot([parseFloat(req.params.real),parseFloat(req.params.imag)], 1000);
    console.log(req.params);
    res.send(a);
})



app.listen(8081)
app.listen(8080)
