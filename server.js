const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log('Usuario Conectado');

    socket.on('chat message', (message) =>{
        console.log('Recived message:', message);
        io.emit('chat message', message);
    });

    fs.appendFile('ChatComponent.txt', `${new Date().toLocaleString()}: ${message}\n`, (erro) =>{
        if (erro){
            console.error('Erro ao salvar mensagem no arquivo de log', erro);
        } else{
            console.log('mensagem salva com sucesso!')
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuario Desconectado');
    });
});

app.post('/send-message', (req, res) =>{
    const { message } = req.body;
    console.log('Mensagem Recebida', message);
    io.emit('chat message', message);
    res.status(200).send('Message received and sent to clients');
    fs.appendFile('ChatComponent.txt', `${new Date().toLocaleString()}: ${message}\n`, (erro) =>{
        if (erro){
            console.error('Erro ao salvar mensagem no arquivo de log', erro);
        } else{
            console.log('mensagem salva com sucesso!')
        }
    });
});

const port = process.env.PORT || 3001;
server.listen(port, () =>{
    console.log(`Servidor ouvindo na porta ${port}`);
});