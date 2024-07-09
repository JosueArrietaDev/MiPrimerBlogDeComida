/* AGRADECEMOS EL TREBAJO DEL PROFE VINNY 
AL CREAR ESTE SERVIDOR  QUE VAMOS A USAR*/

// VAMOS A VER COMO NOS ROBAMOS PRESTADO ESTE SERVIDOR

// Importamos la función `createServer` del módulo `http` de Node.js
import { createServer } from 'node:http';
// Importamos la función `readFile` del módulo `fs/promises` de Node.js
import { readFile } from 'node:fs/promises';

// Definimos el nombre del archivo HTML que vamos a leer
let archivoHTML = 'comida.html';

// Creamos un servidor HTTP
const server = createServer(async (request, respuesta) => {
    // Manejamos las solicitudes GET en la ruta raíz
    if (request.method === 'GET' && request.url === '/') {
        try {
            // Leemos el archivo HTML
            const data = await readFile(archivoHTML, 'utf8');
            // Enviamos el contenido del archivo HTML como respuesta
            respuesta.writeHead(200, { 'Content-Type': 'text/html' });
            respuesta.end(data);
        } catch (err) {
            // Manejamos errores al leer el archivo
            console.error('Error al leer el archivo:', err);
            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
            respuesta.end('Error interno del servidor');
        }
    } else if (request.method === 'GET' && request.url === '/EstilosC.css') {
        // Leemos el archivo CSS
        const data = await readFile("EstilosC.css", 'utf8');
        // Enviamos el contenido del archivo HTML como respuesta
        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        respuesta.end(data);
    }
    else {
        // Manejamos otras rutas o métodos
        respuesta.writeHead(404, { 'Content-Type': 'text/plain' });
        respuesta.end('Página no encontrada');
    }
});

// Definimos el puerto en el que el servidor escuchará
const PORT = 3000;

// Iniciamos el servidor en el puerto especificado
server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
