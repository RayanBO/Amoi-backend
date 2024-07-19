let connections = [];

function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('Un utilisateur est connecté');

        connections.push({
            id: socket.id,
            handshake: socket.handshake,
            fullname: '',
            iduser: null,
            screen: '/login'
        });

        io.emit('updateConnections', connections);

        socket.on('coucou', (targetId) => {
            const targetSocket = io.sockets.sockets.get(targetId);
            if (targetSocket) {
                targetSocket.emit('coucou', 'coucou');
            }
        });

        socket.on('updateFullname', (fullname) => {
            const connIndex = connections.findIndex(conn => conn.id === socket.id);
            if (connIndex !== -1) {
                connections[connIndex].fullname = fullname;
                io.emit('updateConnections', connections);
            }
        });

        socket.on('updateIduser', (iduser) => {
            const connIndex = connections.findIndex(conn => conn.id === socket.id);
            if (connIndex !== -1) {
                connections[connIndex].iduser = iduser;
                io.emit('updateConnections', connections);
            }
        });

        socket.on('updateWindow', (screen) => {
            const connIndex = connections.findIndex(conn => conn.id === socket.id);
            if (connIndex !== -1) {
                connections[connIndex].screen = screen;
                io.emit('updateConnections', connections);
            }
        });

        socket.on('sendMessage', (messageData) => {
            io.emit('message', messageData);
        });

        socket.on('disconnect', () => {
            console.log('Un utilisateur est déconnecté');
            connections = connections.filter(conn => conn.id !== socket.id);
            io.emit('updateConnections', connections);
        });
    });
}

module.exports = { setupSocket };