
// 1. Socket server

const io = require('socket.io')(3000, {
    cors: {
        origin: true, // true means to use any frontend.
    },
})

io.on('connection', socket => {
    socket.emit('connection', "Bonjour, vous êtes bien connecté :)")

    socket.on('request', req => {  // The request object structure is : { real: <float>, imag: <float>, itt: <float> }
        requests.push({ data: { real: req.real, imag: req.imag, itt: req.itt }, socket: socket })

        socket.emit('reqRecieved', requests.length)
        popFromQueue()
    })
})


// 2. HTTP SERVER

const bodyParser = require('body-parser');
const fs = require('fs')

var servers 
fs.readFile('./servers.json', 'utf8' , (err, data) => {
    if (err) return err
    servers = JSON.parse(data)
  })

const http = require('http')

var requests = [];
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' -> (CSS, image, JS...)


function popFromQueue() {
    if (requests.length == 0) return 0
    const request = requests[0]

    var serverfound = false;
    for (var i = 0; i < servers.length && serverfound == false; i++) {
        if (servers[i].state == "ready") {
            serverfound = true;
            servers[i].state = "busy";
            requests.shift() // Pop the request of the queue

            url = `http://${servers[i].ip}:${servers[i].port}/inMandelbrot/${request.data.real}/${request.data.imag}/${request.data.itt}`

            http.get(url, function (res) {
                var body = '';

                res.on('data', function (chunk) {
                    body += chunk;
                });

                res.on('end', function () {
                    var response = JSON.parse(body);
                    request.socket.emit('response', { request: request.data, response: response, resolved: servers[i - 1].name })
                    console.log(servers)
                    servers[i - 1].state = "ready";
                    console.log('AF : ' + JSON.stringify(servers))
                    popFromQueue()
                });
            })//.on('error', function(e){
            //     if(e.code == 'ECONNREFUSED') servers[i].state = 'unavailable'
            //     else console.log("Got an error: ", e);
            // });
        }
    };
}


app.get("/", function (req, res) {
    res.render("./index.pug")
})

app.get("/multiple", function (req, res) {
    res.render("./multiple.pug")
})
app.listen(8082)