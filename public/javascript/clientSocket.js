const socket = io('http://localhost:3000')

const real = document.getElementById('real')
const imag = document.getElementById('imag')
const itt = document.getElementById('itt')
const submitButton = document.getElementById('submitButton')
const responseDiv = document.getElementById("responseDiv")
responseDiv.style.display = "none";

socket.on('connection', data => {
  console.log(data)
})

socket.on('reqRecieved', data => {
  responseDiv.style.display = "block";
  responseDiv.innerHTML = `<h3> La requête a bien été prise en compte. </h3> <p> Position dans la file d'attente : ${data}</p>`
})

socket.on('response', data => {
  console.log(data)
  if(data.response[0]) responseDiv.innerHTML = `<h3> Le nombre : < ${data.request.real} + ${data.request.imag} i > fait partie du domaine de Mandelbrot ! </h3> <p> Réponse de "${data.resolved}" </p> <p> Trouvé en ${data.response[1]} ittération(s)`
  else responseDiv.innerHTML = `<h3> Le nombre : < ${data.request.real} + ${data.request.imag} i > ne fait pas partie du domaine de Mandelbrot  ! </h3> <p> Réponse de "${data.resolved}" </p> <p> Trouvé en ${data.response[1]} ittération(s)`
})


submitButton.addEventListener('click', e => {
  e.preventDefault()
  req = {real : parseFloat(real.value), imag : parseFloat(imag.value), itt : parseFloat(itt.value)}
  socket.emit('request', req)
})