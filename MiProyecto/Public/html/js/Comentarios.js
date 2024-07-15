// ESTO ES COMENTARIOS

// Espera a que se cargue completamente el contenido del documento HTML
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencias a los elementos del formulario y de la lista de comentarios
    const formularioComentario = document.getElementById("formularioComentario");
    const inputComentario = document.getElementById("inputComentario");
    const listaComentarios = document.getElementById("listaComentarios");
    // Agrega un event listener al formulario para el evento 'submit'
    formularioComentario.addEventListener("submit", function (event) {
      // Previene el comportamiento por defecto del formulario (enviar los datos a algún lugar)
      event.preventDefault();
      // Obtiene el valor del comentario y del nombre de usuario de los campos correspondientes
      const comentario = inputComentario.value;
      const username = document.getElementById("username").value;
      // Verifica que tanto el comentario como el nombre de usuario no estén vacíos
      if (comentario.trim() !== "" && username.trim() !== "") {
        // Llama a la función 'agregarComentario()' para agregar el comentario a la lista de comentarios
        agregarComentario(username, comentario);
        // Limpia los campos de comentario y nombre de usuario después de agregar el comentario
        inputComentario.value = "";
        document.getElementById("username").value = "";
      } else {
        // Muestra una alerta pidiendo al usuario que introduzca su nombre y comentario
        alert("Por favor, introduce tu nombre y comentario.");
      }
    });
    // Define la función para agregar un comentario a la lista de comentarios
    function agregarComentario(username, comentario) {
      // Crea un nuevo elemento de lista (<li>)
      const nuevoComentario = document.createElement("li");
      // Asigna el contenido del comentario junto con el nombre de usuario en formato de negrita
      nuevoComentario.innerHTML =
        "<strong>" + username + ":</strong> " + comentario;
      // Agrega el nuevo elemento a la lista de comentarios
      listaComentarios.appendChild(nuevoComentario);
    }
  });
  