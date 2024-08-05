document.addEventListener("DOMContentLoaded", function () {
    const formularioComentario = document.getElementById("formularioComentario");
    const inputComentario = document.getElementById("inputComentario");
    const listaComentarios = document.getElementById("listaComentarios");
  
    formularioComentario.addEventListener("submit", function (event) {
        event.preventDefault();
        const comentario = inputComentario.value;
        const username = document.getElementById("username").value;
  
        if (comentario.trim() !== "" && username.trim() !== "") {
            const comentarioData = {
                foto_id: obtenerFotoId(),
                usuario: username,
                comentario_texto: comentario,
                reaccion: 'like',  // Ajusta según sea necesario
                ip_persona: obtenerIP()
            };
  
            fetch('http://localhost:3000/comentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comentarioData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.comentario_id) {
                    agregarComentario(username, comentario);
                    inputComentario.value = "";
                    document.getElementById("username").value = "";
                } else {
                    alert('Error al guardar el comentario.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al guardar el comentario.');
            });
        } else {
            alert("Por favor, introduce tu nombre y comentario.");
        }
    });
  
    function agregarComentario(username, comentario) {
        const nuevoComentario = document.createElement("li");
        nuevoComentario.innerHTML = "<strong>" + username + ":</strong> " + comentario;
        listaComentarios.appendChild(nuevoComentario);
    }
  
    document.querySelectorAll('.reaction-contenedor').forEach(container => {
        const likeButton = container.querySelector('.like-button');
        const deslikeButton = container.querySelector('.deslike-button');
        const likeCount = container.querySelector('.like-count');
        const deslikeCount = container.querySelector('.deslike-count');
  
        likeButton.addEventListener('click', () => {
            const reaccionData = {
                foto_id: obtenerFotoId(),
                like: true,
                ip_persona: obtenerIP()
            };
  
            fetch('http://localhost:3000/reacciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reaccionData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.reaccion_id) {
                    likeCount.textContent = parseInt(likeCount.textContent) + 1;
                } else {
                    alert('Error al guardar la reacción.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al guardar la reacción.');
            });
        });
  
        deslikeButton.addEventListener('click', () => {
            const reaccionData = {
                foto_id: obtenerFotoId(),
                like: false,
                ip_persona: obtenerIP()
            };
  
            fetch('http://localhost:3000/reacciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reaccionData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.reaccion_id) {
                    deslikeCount.textContent = parseInt(deslikeCount.textContent) + 1;
                } else {
                    alert('Error al guardar la reacción.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al guardar la reacción.');
            });
        });
    });
  
    function obtenerFotoId() {
        // Esta función debe obtener el ID de la foto correspondiente. Ajusta según sea necesario.
        return 1;
    }
  
    function obtenerIP() {
        // Esta función debe obtener la IP del usuario. Ajusta según sea necesario.
        return '127.0.0.1';
    }
  });
  