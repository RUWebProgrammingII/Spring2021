document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.button').addEventListener('click', function() {
    document.querySelector('.drop-zone').classList.add('loading');
    const imageWebWorker = new ImageWebWorker();
    const imageThumbnail = document.querySelector('.img-thumbnail');
    imageWebWorker.colorizeImage(imageThumbnail.dataset.image);
  });
});
