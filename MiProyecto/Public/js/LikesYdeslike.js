document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.reaction-contenedor').forEach(container => {
      const likeButton = container.querySelector('.like-button');
      const deslikeButton = container.querySelector('.deslike-button');
      const likeCount = container.querySelector('.like-count');
      const deslikeCount = container.querySelector('.deslike-count');

      likeButton.addEventListener('click', () => {
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
      });

      deslikeButton.addEventListener('click', () => {
          deslikeCount.textContent = parseInt(deslikeCount.textContent) + 1;
      });
  });
});
