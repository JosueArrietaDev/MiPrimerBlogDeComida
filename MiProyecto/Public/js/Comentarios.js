// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function () {
    
    // Obtiene el formulario de comentarios por su ID.
    const formularioComentario = document.getElementById("formularioComentario");
    
    // Obtiene el input donde el usuario escribe su comentario.
    const inputComentario = document.getElementById("inputComentario");
    
    // Obtiene el input donde el usuario ingresa su nombre.
    const inputUsername = document.getElementById("username");
    
    // Obtiene la lista donde se mostrarán los comentarios.
    const listaComentarios = document.getElementById("listaComentarios");
  
    // Añade un listener para manejar el evento de enviar (submit) del formulario.
    formularioComentario.addEventListener("submit", function (event) {
        
        // Evita que el formulario se envíe de la forma tradicional, que recargaría la página.
        event.preventDefault();
        
        // Obtiene el valor del comentario ingresado, eliminando espacios en blanco al principio y al final.
        const comentario = inputComentario.value.trim();
        
        // Obtiene el valor del nombre de usuario ingresado, también eliminando espacios en blanco.
        const username = inputUsername.value.trim();
  
        // Verifica que ambos campos (nombre y comentario) no estén vacíos.
        if (comentario !== "" && username !== "") {
            
            // Llama a la función que agrega el comentario a la lista visible en la página.
            agregarComentario(username, comentario);

            // Prepara un objeto con los datos del comentario y nombre para enviarlo al servidor.
            const comentarioData = {
                nombre: username,
                comentario: comentario
            };
  
            // Envía el comentario al servidor utilizando el método POST de la API Fetch.
            fetch('/comentario', {
                method: 'POST', // Indica que la solicitud es un POST.
                headers: {
                    'Content-Type': 'application/json' // Especifica que el contenido enviado es JSON.
                },
                body: JSON.stringify(comentarioData) // Convierte el objeto `comentarioData` a un JSON string.
            })
            .then(response => response.json()) // Espera la respuesta del servidor y la convierte a JSON.
            .then(data => {
                // Verifica si la respuesta contiene un ID, lo que indica que el comentario se guardó exitosamente.
                if (!data.id) {
                    alert('Error al guardar el comentario.'); // Muestra un mensaje de error si no se guardó.
                    listaComentarios.removeChild(listaComentarios.lastChild); // Elimina el comentario de la lista si falló.
                }
            })
            .catch(error => {
                // Maneja cualquier error que ocurra durante el fetch.
                console.error('Error:', error); // Imprime el error en la consola para depuración.
                alert('Error al guardar el comentario.'); // Muestra un mensaje de error.
                listaComentarios.removeChild(listaComentarios.lastChild); // Elimina el comentario de la lista si falló.
            });
  
            // Limpia los campos del formulario para que queden listos para un nuevo comentario.
            inputComentario.value = "";
            inputUsername.value = "";
        } else {
            // Si alguno de los campos está vacío, muestra un mensaje de alerta.
            alert("Por favor, introduce tu nombre y comentario.");
        }
    });
  
    // Función que crea un nuevo elemento de lista (<li>) y lo añade a la lista de comentarios en el DOM.
    function agregarComentario(username, comentario) {
        const nuevoComentario = document.createElement("li"); // Crea un nuevo elemento <li>.
        nuevoComentario.innerHTML = "<strong>" + username + ":</strong> " + comentario; // Define el contenido del <li>.
        listaComentarios.appendChild(nuevoComentario); // Añade el <li> a la lista de comentarios.
    }
});
