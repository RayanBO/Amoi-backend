const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const routes = require('./routes');
const usersRouter = require('./routes/users');

const { setupSocket } = require('./socketHandlers');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DIR
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:1234'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use('/', routes);
app.use('/users', usersRouter);


const server = http.createServer(app);

const io = socketIo(server, {
    cors: corsOptions
});

setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});