const express = require('express');
const app = express();
const isInMandelbrot = require('./mandelbrot.js');

app.get('/inMandelbrot/:real/:imag/:itt', async function (req, res) {
    a = isInMandelbrot.isInMandelbrot([parseFloat(req.params.real),parseFloat(req.params.imag)], parseInt(req.params.itt));
    res.send(a);
})

app.listen(8081)
app.listen(8079)
app.listen(8083)