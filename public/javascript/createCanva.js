const socket = io('http://localhost:3000')

socket.on('connection', data => {
    console.log(data)
})

// Get elements from DOM

const realFrom = document.getElementById('realFrom')
const realTo = document.getElementById('realTo')
const imagFrom = document.getElementById('imagFrom')
const imagTo = document.getElementById('imagTo')
const submitButton = document.getElementById('submitButton')
const canvas = document.getElementById('canvas');
if (canvas.getContext) var ctx = canvas.getContext('2d');
const width = 500   // to do, change 1000 in height from html ==> multiple.pug
const height = 500 //corespond to number of pixels


submitButton.addEventListener('click', e => {
    horizontalStep = (parseFloat(realTo.value) - parseFloat(realFrom.value)) / width
    verticalStep = (parseFloat(imagTo.value) - parseFloat(imagFrom.value)) / height



    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            req = {
                realCanvas: x,
                imagCanvas: y,
                real: parseFloat(realFrom.value) + (x * horizontalStep),
                imag: parseFloat(realFrom.value) + (y * horizontalStep), //////////// <--- change "imagFrom"
                itt: 1000
            }
            socket.emit('request', req)
        }
    }
})

socket.on('response', data => {
    //console.log(data)
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









        // if (itt < 10) ctx.fillStyle = 'rgb(255,255,255)'
        // else if (itt > 10 && itt < 120) ctx.fillStyle = 'rgb(255,0,0)' 
        // else if (itt > 120 && itt < 500) ctx.fillStyle = 'rgb(0,255,0)'
        // else if (itt > 500 && itt < 750) ctx.fillStyle = 'rgb(0,0,255)'
        // else ctx.fillStyle = 'rgb(255,255,255)'    


        // ctx.fillStyle = 'rgb(255,255,255)'  
    }
    ctx.fillRect(data.request.realCanvas, data.request.imagCanvas, 1, 1);

})