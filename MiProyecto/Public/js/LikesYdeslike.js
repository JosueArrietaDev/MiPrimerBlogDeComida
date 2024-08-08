// Espera a que todo el contenido del DOM esté completamente cargado antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', (event) => {
    
    // Selecciona todos los elementos con la clase 'reaction-contenedor' y ejecuta la función en cada uno de ellos.
    document.querySelectorAll('.reaction-contenedor').forEach(container => {
        
        // Dentro de cada contenedor de reacciones, selecciona el botón de "like".
        const likeButton = container.querySelector('.like-button');
        
        // Dentro de cada contenedor de reacciones, selecciona el botón de "dislike".
        const deslikeButton = container.querySelector('.deslike-button');
        
        // Dentro de cada contenedor de reacciones, selecciona el elemento que muestra la cantidad de "likes".
        const likeCount = container.querySelector('.like-count');
        
        // Dentro de cada contenedor de reacciones, selecciona el elemento que muestra la cantidad de "dislikes".
        const deslikeCount = container.querySelector('.deslike-count');
  
        // Añade un evento 'click' al botón de "like" que se ejecutará cuando el usuario haga clic.
        likeButton.addEventListener('click', () => {
            
            // Incrementa el valor actual del contador de "likes" en 1.
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            
            // Llama a la función para guardar la reacción de "like" en IndexedDB.
            saveReaction('like');
        });
  
        // Añade un evento 'click' al botón de "dislike" que se ejecutará cuando el usuario haga clic.
        deslikeButton.addEventListener('click', () => {
            
            // Incrementa el valor actual del contador de "dislikes" en 1.
            deslikeCount.textContent = parseInt(deslikeCount.textContent) + 1;
            
            // Llama a la función para guardar la reacción de "dislike" en IndexedDB.
            saveReaction('dislike');
        });
    });
});
  
// Función que guarda el tipo de reacción ("like" o "dislike") en IndexedDB.
function saveReaction(type) {
    
    // Abre (o crea si no existe) una base de datos llamada 'Comidablog' en IndexedDB, en su versión 1.
    const dbPromise = idb.open('Comidablog.db', 1, upgradeDB => {
        
        // Si es necesario, crea un almacén de objetos (tabla) llamado 'reactions' con clave principal auto-incremental.
        upgradeDB.createObjectStore('reactions', { keyPath: 'id', autoIncrement: true });
    });
  
    // Cuando la base de datos esté lista, procede a guardar la reacción.
    dbPromise.then(db => {
        
        // Inicia una transacción de lectura-escritura en el almacén de objetos 'reactions'.
        const tx = db.transaction('reactions', 'readwrite');
        
        // Obtiene una referencia al almacén de objetos 'reactions'.
        const store = tx.objectStore('reactions');
        
        // Añade un nuevo objeto al almacén con el tipo de reacción (like o dislike).
        store.add({ type });
        
        // Completa la transacción.
        return tx.complete;
    }).then(() => {
        
        // Muestra un mensaje en la consola indicando que la reacción se guardó exitosamente.
        console.log('Reacción guardada exitosamente');
    }).catch(error => {
        
        // Maneja cualquier error que ocurra durante el proceso de guardado.
        console.error('Error al guardar reacción:', error);
    });
}
