// Guardar un like
function saveLike(photoId) {
    // Obtiene los likes almacenados en localStorage como un objeto JSON
    let likes = JSON.parse(localStorage.getItem('likes')) || {};
  
    // Incrementa el contador de likes para la foto con el ID especificado
    likes[photoId] = (likes[photoId] || 0) + 1;
  
    // Guarda los likes actualizados en localStorage como un string JSON
    localStorage.setItem('likes', JSON.stringify(likes));
};
  
  
function saveDislike(photoId) {
    // Obtiene los dislikes almacenados en localStorage como un objeto JSON
    let dislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
  
    // Incrementa el contador de dislikes para la foto con el ID especificado
    dislikes[photoId] = (dislikes[photoId] || 0) + 1;
  
    // Guarda los dislikes actualizados en localStorage como un string JSON
    localStorage.setItem('dislikes', JSON.stringify(dislikes));
};
  