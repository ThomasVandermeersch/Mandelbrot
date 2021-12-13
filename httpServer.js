var bodyParser = require("body-parser")
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' -> (CSS, image, JS...)

app.get("/", function (req, res) {
    res.render("./index.pug")
})

app.get("/multiple", function (req, res) {
    res.render("./multiple.pug")
})

app.get("*", function(req,res){
    res.status(404)
    res.send("<h1> ERROR : 404 PAGE NOT FOUND </h1>")
})
app.listen(8082)
