const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers la base de données SQLite
const dbPath = path.resolve(__dirname, 'database.db');
console.log(dbPath);

// Initialiser la base de données
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données', err.message);
        return
    }

    db.run(`CREATE TABLE IF NOT EXISTS bo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        desc TEXT NULL)`, (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table users', err.message);
        }
    });

});

// Fonction pour vérifier les informations de connexion
function authenticateUser(login, callback) {
    db.get(`SELECT * FROM users WHERE login = ? AND isactif = 1`, [login], (err, row) => {
        if (err) {
            console.error('Erreur lors de l\'authentification de l\'utilisateur', err.message);
            callback(err);
        } else {
            callback(null, row);
        }
    });
}

module.exports = {
    db,
    authenticateUser
};
