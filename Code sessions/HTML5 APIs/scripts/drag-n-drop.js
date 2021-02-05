document.addEventListener('DOMContentLoaded', function() {
  const dropZone = document.querySelector('.drop-zone');

  [ 'dragenter', 'drop', 'dragover', 'dragleave' ].forEach(evt => {
    dropZone.addEventListener(evt, function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  dropZone.addEventListener('dragenter', function(e) {
    if (!dropZone.classList.contains('blinking')) {
      dropZone.classList.add('blinking');
    }
  });

  dropZone.addEventListener('drop', function(e) {
    dropZone.classList.remove('blinking');
    dropZone.classList.add('loading');
    const imageWebWorker = new ImageWebWorker();
    imageWebWorker.displayImage(e.dataTransfer.files);
  });

  dropZone.addEventListener('dragleave', function(e) {
    dropZone.classList.remove('blinking');
  });
});
