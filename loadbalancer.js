const bodyParser = require('body-parser');
const servers = [{ip: "127.0.0.1", port: "8080", state: "ready"}, {ip: "127.0.0.1", port: "8081", state: "ready"}];

var requests = [];
var isInMandelbrot = require('./mandelbrot.js');
var express = require('express');
const { request } = require('express');
var app = express();


app.use(bodyParser.urlencoded({ extended: true}));


app.get('/inMandelbrot/:real/:imag', function (req, res) {
    requests.push([parseFloat(req.params.real),parseFloat(req.params.imag)])
    var serverfound = false;
    for (i=0; i<servers.length && serverfound==false; i++) {
        if (servers[i].state=="ready") {
            servers[i].state="busy";
            serverfound=true;
        }
    };
    //servers.forEach(function(server){
      
    console.log(servers);
    res.send("Hello");
    console.log(requests)
})



app.listen(8082)

