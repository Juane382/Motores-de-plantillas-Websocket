const ServerSocket = io('http://localhost:8080/')



ServerSocket.on('mesajito', datosAdjuntos => {
    console.log(datosAdjuntos)
})

ServerSocket.on('alerta', datosAdjuntos => {
    alert(datosAdjuntos)
})