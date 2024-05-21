//AQUI VA IR MI HTML de la paginade comida

 
// Función para mostrar la sección correspondiente y ocultar las demás
function mostrarSeccion(id) {
  // Selecciona todas las secciones y las oculta
  var secciones = document.querySelectorAll('.section');
  secciones.forEach(function(seccion) {
    seccion.classList.remove('visible');
  });

  // Muestra la sección seleccionada
  var seccionSeleccionada = document.getElementById(id);
  seccionSeleccionada.classList.add('visible');
}

// Obtener los enlaces de la barra de navegación AGREGAR LOS LINMCK
var inicioLink = document.getElementById('inicioLink');
var recetasLink = document.getElementById('recetasLink');
var contactoLink = document.getElementById('contactoLink');

// Asignar eventos de clic a los enlaces de navegación
inicioLink.addEventListener('click', function(event) {
  // Previene la acción predeterminada del enlace
  event.preventDefault();
  // Muestra la sección "Inicio"
  mostrarSeccion('inicio');
});

recetasLink.addEventListener('click', function(event) {
  // Previene la acción predeterminada del enlace
  event.preventDefault();
  // Muestra la sección "Recetas"
  mostrarSeccion('recetas');
});

contactoLink.addEventListener('click', function(event) {
  // Previene la acción predeterminada del enlace
  event.preventDefault();
  // Muestra la sección "Contacto"
  mostrarSeccion('contacto');
});

//funcion de formilario,  o comentarios.
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
  }/* que crea un nuevo elemento de lista (<li>) en el DOM, establece
 su contenido de texto como el comentario proporcionado y
 luego lo agrega a la lista de comentarios en la página.*/
});

// agrege este comentario porque  no me deja gardar, nose-->

