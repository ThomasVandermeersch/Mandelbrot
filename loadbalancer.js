const bodyParser = require('body-parser');
const servers = [{ ip: "127.0.0.1", port: "8080", state: "ready" }, { ip: "127.0.0.1", port: "8081", state: "ready" }];
const http = require('http')


var requests = [];
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));


function popFromQueue() {
    const request = requests.shift()
    console.log("Request : " + request)
    var serverfound = false;
    for (i = 0; i < servers.length && serverfound == false; i++) {
        if (servers[i].state == "ready") {
            servers[i].state = "busy";
            serverfound = true;
            url = `http://${servers[i].ip}:${servers[i].port}/inMandelbrot/2/1`
            console.log(url)

            http.get(url, function(res){
                var body = '';
                
            
                res.on('data', function (chunk){
                    body += chunk;
                });
            
                res.on('end', function(){
                    var fbResponse = JSON.parse(body);
                    console.log("Got a response: ", fbResponse);
                });
            }).on('error', function(e){
                if(e.code == 'ECONNREFUSED'){
                    servers[i].state = 'unavailable'
                }
                console.log("Got an error: ", e);
            });
        }
    };
}

app.get('/inMandelbrot/:real/:imag', function (req, res) {
    requests.push([parseFloat(req.params.real), parseFloat(req.params.imag)])
    popFromQueue()

    console.log(servers);
    res.send("Hello");
    console.log(requests)
})

app.listen(8082)