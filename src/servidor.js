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

io.on('connection', clienteSocket => {
    console.log(`nuevo cliete conectado. Socket id:  ${clienteSocket.id}`)
    clienteSocket.emit('mesajito', { hola: 'HolaMundo' })
    clienteSocket.emit('alerta', 'hola que onda!')
    clienteSocket.on('mensajeDelCliente',datosAdjuntos => {
        console.log(`${clienteSocket.id} dice:`)
        console.log(datosAdjuntos)
    })
})

app.get('/', async (req, res) => {
    const mensajes = await productos.getProducts()
    res.render('realTimeProducts', {
        hayMensajes: mensajes.lenght > 0,
        mensajes
    })
})
