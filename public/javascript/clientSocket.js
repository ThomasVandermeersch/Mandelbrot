const socket = io('http://localhost:3000')

const real = document.getElementById('real')
const imag = document.getElementById('imag')
const itt = document.getElementById('itt')
const submitButton = document.getElementById('submitButton')

socket.on('connection', data => {
  console.log(data)
})

socket.on('reqRecieved', data => {
  //console.log(data)
})

socket.on('response', data => {
  console.log(data)
})


submitButton.addEventListener('click', e => {
  e.preventDefault()
  req = {real : parseFloat(real.value), imag : parseFloat(imag.value), itt : parseFloat(itt.value)}
  socket.emit('request', req)
})