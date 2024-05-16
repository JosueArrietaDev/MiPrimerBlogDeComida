//AQUI VA IR MI HTML de la paginade comida

    document.addEventListener("DOMContentLoaded", function() {
        const formularioComentario = document.getElementById("formulario-comentario");
        const inputComentario = document.getElementById("input-comentario");
        const listaComentarios = document.getElementById("lista-comentarios");

        formularioComentario.addEventListener("submit", function(event) {
            event.preventDefault(); // Evitar que el formulario se mande

            const comentario = inputComentario.value;
            if (comentario.trim() !== "") {
                agregarComentario(comentario);
                inputComentario.value = ""; // Limpiar el campo de entrada después de enviar el comentario
            }  
        }  );

        function agregarComentario(comentario) {
        const nuevoComentario = document.createElement("li");
        nuevoComentario.textContent = comentario;
        listaComentarios.appendChild(nuevoComentario);
    }
});

// agrege este comentario porque  no me deja gardar, nose-->