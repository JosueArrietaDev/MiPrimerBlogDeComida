//AQUI VA IR MI HTML de la paginade comida

//el addevent crea un evento de intercacciones del usurio
document.addEventListener("DOMContentLoaded", function () { 
  const formularioComentario = document.getElementById("formulario-comentario");
  const inputComentario = document.getElementById("input-comentario");
  const listaComentarios = document.getElementById("lista-comentarios");
  // son los 3 elementos de la funcion

  formularioComentario.addEventListener("submit", function (event) {
    //Cuando se formulario el envia, se ejecutará la función sigue.

    event.preventDefault(); 
    /* previene el comportamiento por defecto del formulario, que sería recargar 
     la página al ser enviado el formulario*/

    const comentario = inputComentario.value;
    //se obtiene el valor del comentario que el usuario ha ingresado

    if (comentario.trim() !== "") {
      //verifica si el comentario ingresado por el usuario no está vacío
      
      agregarComentario(comentario);
      inputComentario.value = "";
      /*Si el comentario no está vacío, se llama a la función agregarComentario
      para agregar el comentario a la lista y luego se limpia el campo de entrada 
      estableciendo su valor en una cadena vacía.*/
    }
    
  });

  function agregarComentario(comentario) {
    const nuevoComentario = document.createElement("li");
    nuevoComentario.textContent = comentario;
    listaComentarios.appendChild(nuevoComentario);
  }
});
/* que crea un nuevo elemento de lista (<li>) en el DOM, establece
 su contenido de texto como el comentario proporcionado y
 luego lo agrega a la lista de comentarios en la página.*/



// agrege este comentario porque  no me deja gardar, nose-->
