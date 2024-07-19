# voici un code frontend 
``` html
<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    <!-- <script src="/socket.io/socket.io.js"></script> -->
    <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
</head>

<body>
    <h1>Login</h1>
    <form id="loginForm">
        <label for="login">Login:</label>
        <input type="text" id="login" name="login" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">Login</button>
    </form>

    <script>
        const socket = io('https://accurate-selective-front.glitch.me/', { auth: { token: "RayanBO" } });
        var mySocketInfo = {}
        var usersActif = []
        var user = {}

        socket.emit('updateWindow', '/login')
    </script>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;

            fetch('https://accurate-selective-front.glitch.me/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            }).then(response => response.json())
                .then(data => {
                    if (data.message === 'Authentication successful') {
                        socket.emit('updateIduser', data.user.iduser);
                        socket.emit('updateFullname', data.user.nom);
                        alert('PASS')
                    } else {
                        console.error('Authentication failed:', data.message);
                    }
                }).catch(error => {
                    console.error('Error during fetch:', error);
                });
        });

        socket.on('connect', () => {
            mySocketInfo.id = socket.id;
        });
        socket.on('coucou', (msg) => {
            alert(msg);
        });

        socket.on('updateConnections', (connections) => {
            usersActif = connections
            const currentUser = connections.find(conn => conn.id === socket.id);
            user = currentUser
        });

        // Envoyer un message 'coucou' au client sélectionné
        function sendCoucou(targetId) {
            socket.emit('coucou', targetId);
        }

        // Mettre à jour le fullname
        function updateFullname() {
            const fullname = document.getElementById('fullname').value;
            socket.emit('updateFullname', fullname);
        }
    </script>
</body>

</html>
```
