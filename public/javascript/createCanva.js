const socket = io('http://localhost:3000')

socket.on('connection', data => {
    console.log(data)
})

// Get elements from DOM

const realFrom = document.getElementById('realFrom')
const realTo = document.getElementById('realTo')
const submitButton = document.getElementById('submitButton')

const canvas = document.getElementById('canvas');
if (canvas.getContext) var ctx = canvas.getContext('2d');
const width = 250   // to do, change 1000 in height from html ==> multiple.pug
const height = 250 //corespond to number of pixels


submitButton.addEventListener('click', e => {
    step = (parseFloat(realTo.value) - parseFloat(realFrom.value)) / width

    requests = []
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            req = {
                realCanvas: x,
                imagCanvas: y,
                real: parseFloat(realFrom.value) + (x * step),
                imag: parseFloat(realFrom.value) + (y * step), //////////// <--- change "imagFrom"
                itt: 100000
            }
            requests.push(req)
        }
    }

    for(var i = requests.length-1;i>=0;i--){
        popIndex = Math.floor(Math.random() * requests.length)
        req = requests[popIndex]
        requests.splice(popIndex,1)
        socket.emit('request', req)
      }})

socket.on('response', data => {
    if (data.response[0]) {
        ctx.fillStyle = 'rgb(0,0,0)'
    }
    else {
        itt = data.response[1]
        color = Math.floor(255 - (255 / 999) * itt)


        cian = 'rgb(' + color + ', 255, 255 )'
        pink = 'rgb(255,' + color + ', 255 )'
        yellow = 'rgb(255, 255, ' + color + '  )'

        if (itt < 10) ctx.fillStyle = 'rgb(139,0,0)'
        else if (itt > 10 && itt < 120) ctx.fillStyle = cian

        // if (itt < 120) ctx.fillStyle = cian
        else if (itt > 120 && itt < 500) ctx.fillStyle = pink
        else if (itt > 500 && itt < 750) ctx.fillStyle = yellow
        else ctx.fillStyle = 'rgb(139,0,0)' //'rgb(255,255,255)'
    }
    ctx.fillRect(data.request.realCanvas, data.request.imagCanvas, 1, 1);
})