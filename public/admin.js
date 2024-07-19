
const socket = io();
var mySocketInfo = {};
var usersActif = [];
var user = {};
socket.emit('updateWindow', '/admin');

socket.on('connect', () => {
    mySocketInfo.id = socket.id;
    document.getElementById('socketId').textContent = mySocketInfo.id;
});

socket.on('updateConnections', (connections) => {
    const connectionsDiv = document.getElementById('connections');
    connectionsDiv.innerHTML = ''; // Vider la liste actuelle

    // Créer une table
    const table = document.createElement('table');
    table.className = 'ant-table';

    // Ajouter l'en-tête du tableau
    const thead = document.createElement('thead');
    thead.className = 'ant-table-thead';
    thead.innerHTML = `
        <tr>
            <th class="ant-table-cell">ID</th>
            <th class="ant-table-cell">Nom Complet</th>
            <th class="ant-table-cell">ID Utilisateur</th>
            <th class="ant-table-cell">Écran</th>
            <th class="ant-table-cell">Action</th>
        </tr>
    `;
    table.appendChild(thead);

    // Ajouter le corps du tableau
    const tbody = document.createElement('tbody');
    tbody.className = 'ant-table-tbody';
    connections.forEach(conn => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="ant-table-cell">
                ${conn.id}
                <button class="ant-btn ant-btn-link" onclick="copyToClipboard('${conn.id}')">
                    <img src="/assets/copie.svg" alt="Copier" style="width: 16px; height: 16px;">
                </button>
            </td>
            <td class="ant-table-cell">${conn.fullname || 'Pas de nom'}</td>
            <td class="ant-table-cell">${conn.id === socket.id ? 'Moi' : (conn.iduser || 'Pas d\'ID utilisateur')}</td>
            <td class="ant-table-cell">${conn.screen}</td>
            <td class="ant-table-cell"><button class="ant-btn" onclick="sendCoucou('${conn.id}')">Coucou</button></td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Ajouter la table à la div connections
    connectionsDiv.appendChild(table);

    // Mettre à jour le fullname du client actuel
    // const currentUser = connections.find(conn => conn.id === socket.id);
    // if (currentUser) {
    //     document.getElementById('socketFullname').textContent = currentUser.fullname || 'Pas de nom';
    // }
});

socket.on('coucou', (msg) => {
    alert(msg);
});

function sendCoucou(targetId) {
    socket.emit('coucou', targetId);
}

function sendCoucouToSpecific() {
    const targetSocketId = document.getElementById('targetSocketId').value;
    socket.emit('coucou', targetSocketId);
}

function updateFullname() {
    const fullname = document.getElementById('fullname').value;
    socket.emit('updateFullname', fullname);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('ID copié dans le presse-papiers');
    }).catch(err => {
        console.error('Erreur lors de la copie : ', err);
    });
}