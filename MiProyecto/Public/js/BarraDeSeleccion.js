    // ESTO ES INICIO Y LINCKS DE LA BARRA DE SELECCION
// Obtener los enlaces de la barra de navegación AGREGAR LOS LINMCK

let inicioLink = document.getElementById("inicioLink");
let menuLink = document.getElementById("menuLink");
let contactoLink = document.getElementById("contactoLink");
let quienessomosLink = document.getElementById("quienessomosLink");

// Asignar eventos de clic a los enlaces de navegación
inicioLink.addEventListener("click", function (event) {
  // Previene la acción predeterminada del enlace
  event.preventDefault();
  // Muestra la sección "Inicio"
  mostrarSeccion("inicio");
});

menuLink.addEventListener("click", function (event) {
  // Previene la acción predeterminada del enlace
  event.preventDefault();
  // Muestra la sección "menu"
  mostrarSeccion("Menu");
});

quienessomosLink.addEventListener("click", function (event) {
  // Previene la acción predeterminada del enlace
  event.preventDefault();
  // Muestra la sección "quienes somos"
  mostrarSeccion("quienessomosLink");
});

contactoLink.addEventListener("click", function (event) {
  // Previene la acción predeterminada del enlace
  event.preventDefault();
  // Muestra la sección "Contacto"
  mostrarSeccion("contacto");
});
