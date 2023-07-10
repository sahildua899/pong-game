const http = require('http');
const app = require('./app');
const PORT  = process.env.PORT || 1030;
const server = http.createServer(app);
const io = require('socket.io');
const socketServer = io(server, {
    cors:{
        origin: '*',
        methods:['GET', 'POST']
    }
})
const sockets = require('./sockets')
sockets.listen(socketServer)

server.listen(PORT, ()=>{
    console.log(`Server is Running at Port ${PORT}`)
})