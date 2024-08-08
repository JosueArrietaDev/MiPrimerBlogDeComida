const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const dbPath = path.resolve(__dirname, 'MiProyecto', 'database', 'ComidaBlog.db');

// Crear la carpeta de la base de datos si no existe
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// Conectar o crear la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos.');
        // Crear las tablas si no existen
        db.run(`
            CREATE TABLE IF NOT EXISTS Reacciones (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tipo TEXT NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS Comentarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                comentario TEXT NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'MiProyecto', 'Public','html','Comida.html')));

// Configurar CSP
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline' https://www.gstatic.com; script-src 'self' 'unsafe-inline' https://www.gstatic.com");
    next();
});

// Ruta para manejar comentarios
app.post('MiProyecto/Public/js/Comentarios.js', (req, res) => {
    const { nombre, comentario } = req.body;
    const query = `INSERT INTO Comentarios (nombre, comentario) VALUES (?, ?)`;
    db.run(query, [nombre, comentario], function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.status(200).send({ id: this.lastID });
    });
});

// Ruta para manejar reacciones
app.post('MiProyecto/Public/js/Comentarios.js', (req, res) => {
    const { tipo } = req.body; // 'like' o 'dislike'
    const query = `INSERT INTO Reacciones (tipo) VALUES (?)`;
    db.run(query, [tipo], function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.status(200).send({ id: this.lastID });
    });
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
