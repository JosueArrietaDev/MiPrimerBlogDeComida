document.addEventListener("DOMContentLoaded", function () {
    const formularioComentario = document.getElementById("formularioComentario");
    const inputComentario = document.getElementById("inputComentario");
    const inputUsername = document.getElementById("username");
    const listaComentarios = document.getElementById("listaComentarios");

    formularioComentario.addEventListener("submit", function (event) {
        event.preventDefault();
        const comentario = inputComentario.value.trim();
        const username = inputUsername.value.trim();

        if (comentario !== "" && username !== "") {
            const comentarioData = {
                nombre: username,
                comentario: comentario
            };

            fetch('/comentario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comentarioData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    agregarComentario(username, comentario);
                    inputComentario.value = "";
                    inputUsername.value = "";
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

    // Gestión de likes y dislikes
    document.querySelectorAll('.reaction-contenedor').forEach(container => {
        const likeButton = container.querySelector('.like-button');
        const dislikeButton = container.querySelector('.dislike-button');
        const likeCount = container.querySelector('.like-count');
        const dislikeCount = container.querySelector('.dislike-count');

        likeButton.addEventListener('click', () => {
            enviarReaccion('like', likeCount);
        });

        dislikeButton.addEventListener('click', () => {
            enviarReaccion('dislike', dislikeCount);
        });
    });

    function enviarReaccion(tipo, contador) {
        fetch('/reaccion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo: tipo })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                contador.textContent = parseInt(contador.textContent) + 1;
            } else {
                alert('Error al guardar la reacción.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al guardar la reacción.');
        });
    }
});
