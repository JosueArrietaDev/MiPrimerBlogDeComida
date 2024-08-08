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
// Configura la aplicación para que use bodyParser para analizar cuerpos de solicitudes JSON.

app.use(express.static(path.join(__dirname, 'MiProyecto', 'Public')));
// Sirve archivos estáticos desde el directorio 'Public'.

// Configurar CSP
app.use((req, res, next) => {
    // Define una política de seguridad de contenido para prevenir la carga de recursos no deseados.
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline' https://www.gstatic.com; script-src 'self' 'unsafe-inline' https://www.gstatic.com");
    next(); // Pasa al siguiente middleware.
});

// Ruta para manejar comentarios
app.post('/api/Comentarios.js', (req, res) => {
    const { nombre, comentario } = req.body;
    // Extrae el nombre y el comentario del cuerpo de la solicitud.
    const query = `INSERT INTO Comentarios (nombre, comentario) VALUES (?, ?)`;
    // Define la consulta SQL para insertar un nuevo comentario en la base de datos.
    db.run(query, [nombre, comentario], function (err) {
        if (err) {
            // Si ocurre un error al ejecutar la consulta, responde con un error 500.
            return res.status(500).send({ error: err.message });
        }
        // Responde con el ID del nuevo comentario.
        res.status(200).send({ id: this.lastID });
    });
});

// Ruta para manejar reacciones
app.post('/api/LikesYdeslike.js', (req, res) => {
    const { tipo } = req.body; // 'like' o 'dislike'
    // Extrae el tipo de reacción del cuerpo de la solicitud.
    const query = `INSERT INTO Reacciones (tipo) VALUES (?)`;
    // Define la consulta SQL para insertar una nueva reacción en la base de datos.
    db.run(query, [tipo], function (err) {
        if (err) {
            // Si ocurre un error al ejecutar la consulta, responde con un error 500.
            return res.status(500).send({ error: err.message });
        }
        // Responde con el ID de la nueva reacción.
        res.status(200).send({ id: this.lastID });
    });
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
