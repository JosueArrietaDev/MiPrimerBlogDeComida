
const sqlite3 = import('sqlite3').verbose();
//Tratar de Omitir .verbose() o Usar cjs que permite el import
const bodyParser = import('body-parser');
const path = import('path');
const express = import('express');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Conectar a la base de datos
const db = new sqlite3.Database('foodblog.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a la base de datos SQLite.');
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  photo_id TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0
)`);

// Ruta para obtener reacciones
app.get('/api/reactions/:photoId', (req, res) => {
  const { photoId } = req.params;
  db.get('SELECT * FROM reactions WHERE photo_id = ?', [photoId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row || { photo_id: photoId, likes: 0, dislikes: 0 });
  });
});

// Ruta para actualizar reacciones
app.post('/api/reactions/:photoId', (req, res) => {
  const { photoId } = req.params;
  const { action } = req.body;

  if (action !== 'like' && action !== 'dislike') {
    res.status(400).json({ error: 'Acción inválida' });
    return;
  }

  db.run(
    `INSERT INTO reactions (photo_id, ${action}s) 
     VALUES (?, 1) 
     ON CONFLICT(photo_id) DO UPDATE SET ${action}s = ${action}s + 1`,
    [photoId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});