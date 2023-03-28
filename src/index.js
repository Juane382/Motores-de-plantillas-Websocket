const ServerSocket = io('http://localhost:8080/')


const plantillaProductos = ``

const btnPresioname = document.querySelector('#btnPresioname')

if(btnPresioname){
    btnPresioname.addEventListener(
        'click',
        e => {
            ServerSocket.emit('mensajeDelCliente',  {datos: [1,2,3]})
        }
    )

}



ServerSocket.on('actualizarProductos', datosAdjuntos => {
   const divHome = document.querySelector('#home')
   console.log('lista:' + datosAdjuntos)
   if(divHome){
    divHome.innerHTML = JSON.stringify(datosAdjuntos)
    
   }
})