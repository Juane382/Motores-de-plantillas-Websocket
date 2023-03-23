import express from 'express'
import {Server as SocketIOServer} from 'socket.io'

const app = express()

app.use(express.static('./src'))

const httpServer = app.listen(8080)

const io = new SocketIOServer(httpServer)

io.on('connection',clienteSocket =>{
    console.log(`nuevo cliete conectado. Socket id:  ${clienteSocket.id}`)
    clienteSocket.emit('mesajito',{hola:'HolaMundo'})
    clienteSocket.emit('alerta', 'hola que onda!')
})

