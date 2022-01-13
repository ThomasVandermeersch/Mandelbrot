
// 1. Socket server

const io = require('socket.io')(3000, {
    cors: {
        origin: true, // true means to use any frontend.
    },
})

io.on('connection', socket => {
    socket.emit('connection', "Bonjour, vous êtes bien connecté :)")

    socket.on('request', function(req){  // The request object structure is : { real: <float>, imag: <float>, itt: <float> }
        requests.push({ data: { real: req.real, imag: req.imag, itt: req.itt, realCanvas : req.realCanvas, imagCanvas : req.imagCanvas }, socket: socket })
        socket.emit('reqRecieved', requests.length)
        popFromQueue() // va essayer de voir s'il est possible de résoudre . Possible => serveur dispo
    })
})


// 2. HTTP SERVER

const fs = require('fs') //récupère une biblithèque qui nous permet de lire des fichiers . Pour lire le fichier server.json

var servers 
fs.readFile('./servers.json', 'utf8' , (err, data) => {
    if (err) return err
    servers = JSON.parse(data)
})


const http = require('http') // bibiliothèque qui va nous permettre de faire des requêtes http vers les serveurs de calcul
var requests = [];

function popFromQueue() {
    if (requests.length == 0) return 0
    const request = requests[0]

    var serverfound = false; // on a pas trouvé de serveur pour faire nos calculs
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
                    servers[i - 1].state = "ready";
                    popFromQueue()
                });
            })
        }
    };
}