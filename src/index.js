const ServerSocket = io('http://localhost:8080/')

const btnPresioname = document.querySelector('#btnPresioname')

if(btnPresioname){
    btnPresioname.addEventListener(
        'click',
        e => {
            ServerSocket.emit('mensajeDelCliente',  {datos: [1,2,3]})
        }
    )

}

ServerSocket.on('mesajito', datosAdjuntos => {
    console.log(datosAdjuntos)
})

ServerSocket.on('alerta', datosAdjuntos => {
    alert(datosAdjuntos)
})