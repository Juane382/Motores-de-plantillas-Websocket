import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import { productManager } from './productsManager.js'

const productos = new productManager('./src/localStorage/productos.json')

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./src'))

const httpServer = app.listen(8080)

const io = new SocketIOServer(httpServer)

io.on('connection',async  clienteSocket => {
    console.log(`nuevo cliete conectado. Socket id:  ${clienteSocket.id}`)
    //clienteSocket.emit('mesajito', { hola: 'HolaMundo' })
    //clienteSocket.emit('actualizarProductos', listaProductos)
    io.sockets.emit('actualizarProductos', await productos.getProducts())

    clienteSocket.on('mensajeDelCliente', async datosAdjuntos => {
        console.log(`${clienteSocket.id} dice:`)
        console.log(datosAdjuntos)

        
    })
})

app.get('/', async (req, res) => {
    const listaProductos = await productos.getProducts()
    //console.log(listaProductos)
    res.render('home', {
        hayProductos: listaProductos.lenght > 0,
        listaProductos

    })


})
