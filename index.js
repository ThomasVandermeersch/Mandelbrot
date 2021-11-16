var express = require('express');
var app = express();




app.get('/', function (req, res) {
    res.send('Hello World!!?');
})

app.get('/mandelbrot',function(req,res){
    res.send('Mandelbrot')
})


app.listen(8081)
app.listen(8080)
