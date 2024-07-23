// Importamos los módulos necesarios
import sqlite3 from 'sqlite3';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import helmet from 'helmet'; // Agregamos helmet para seguridad
import { fileURLToPath } from 'url';

// Configuración inicial
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json()); // Para parsear JSON en las peticiones
app.use(express.static('Public')); // Servir archivos estáticos desde la carpeta 'public'
app.use(helmet()); // Añadimos helmet para mejorar la seguridad

// Conectar a la base de datos
const db = new sqlite3.Database('./database/foodblog.db', (err) => {
  if (err) {
    console.error('!Atención!, Hubo un problema al conectar con la base de datos:', err.message);
  } else {
    console.log('¡Conectado a la base de datos SQLite3!');
  }
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  photo_id TEXT NOT NULL UNIQUE,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0
)`, (err) => {
  if (err) {
    console.error('No se pudo crear la tabla:', err.message);
  } else {
    console.log('¡Muy bien!, Tabla creada o Tabla ya existente.');
  }
});

// Función para validar el ID de la foto
const validarPhotoId = (photoId) => {
  return photoId && typeof photoId === 'string' && photoId.trim() !== '';
};

// Ruta para obtener reacciones
app.get('/api/reactions/:photoId', async (req, res) => {
  const { photoId } = req.params;
  
  // Validamos el photoId
  if (!validarPhotoId(photoId)) {
    return res.status(400).json({ error: 'El ID de la foto no es válido' });
  }

  try {
    // Usamos una promesa para hacer la consulta más limpia
    const row = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM reactions WHERE photo_id = ?', [photoId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    // Si no hay resultados, devolvemos un objeto con valores por defecto
    res.json(row || { photo_id: photoId, likes: 0, dislikes: 0 });
  } catch (err) {
    console.error('¡ALERTA! Hay un error:', err);
    res.status(500).json({ error: 'Hay un error, Pero es mio.' });
  }
});

// Ruta para actualizar reacciones
app.post('/api/reactions/:photoId', async (req, res) => {
  const { photoId } = req.params;
  const { action } = req.body;

  // Validamos los datos de entrada
  if (!validarPhotoId(photoId)) {
    return res.status(400).json({ error: 'El ID de la foto no es válido, Revisalo' });
  }
  if (action !== 'like' && action !== 'dislike') {
    return res.status(400).json({ error: 'La acción es inválida. Solo vale "like" o "dislike"' });
  }

  try {
    // Usamos un prepared statement para mayor seguridad
    const query = `INSERT INTO reactions (photo_id, ${action}s) 
                   VALUES (?, 1) 
                   ON CONFLICT(photo_id) DO UPDATE SET ${action}s = ${action}s + 1`;
    
    await new Promise((resolve, reject) => {
      db.run(query, [photoId], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });

    res.json({ success: true, message: '¡Felicidades, Reacción actualizada!' });
  } catch (err) {
    console.error('Se complicó:', err);
    res.status(500).json({ error: 'Algo salió mal.' });
  }
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err.stack);
  res.status(500).json({ error: 'Se armó un error gráve, disculpá las molestias' });
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}. ¡A darle átomos!`);
});

// Manejamos el cierre gracioso del servidor
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Aviso, Hubo un problema al cerrar la base de datos:', err.message);
    } else {
      console.log('Base de datos cerrada correctamente. Hasta luego.');
    }
    process.exit(err ? 1 : 0);
  });
});