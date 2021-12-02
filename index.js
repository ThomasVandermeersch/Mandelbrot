const bodyParser = require('body-parser');

var isInMandelbrot = require('./mandelbrot.js');
var express = require('express');
const delay = require('delay');
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));



app.get('/inMandelbrot/:real/:imag/:itt', async function (req, res) {
    a = isInMandelbrot.isInMandelbrot([parseFloat(req.params.real),parseFloat(req.params.imag)], parseInt(req.params.itt));
    console.log(req.params);
    res.send(a);
})



app.listen(8081)
app.listen(8079)
app.listen(8083)
