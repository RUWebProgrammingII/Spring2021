(function(globalObject) {
  if (typeof(Worker)) {
    class ImageWebWorker {
      constructor() {
        this.__worker = new Worker('/scripts/image-web-worker-implementation.js');
        this.__dropZone = document.querySelector('.drop-zone');
      }

      displayImage(files) {
        this.__notifyWorker('display', files);
        this.__worker.onmessage = e => {
          const result = e.data;
          this.__dropZone.classList.remove('loading');
          this.__dropZone.innerHTML = `<div class="img-thumbnail" style="background-image: url(${result})" data-image="${result}"></div>`;
          document.querySelector('.button').classList.remove('hidden');
        };
      }

      colorizeImage(encodedImage) {
        this.__notifyWorker('colorize', encodedImage);
        this.__worker.onmessage = e => {
          const result = e.data;
          this.__dropZone.classList.remove('loading');
          this.__dropZone.innerHTML = `<div class="img-thumbnail" style="background-image: url(${result})" data-image="${result}"></div>`;
        }
      }

      __notifyWorker(type, data) {
        this.__worker.postMessage({
          type, data
        });
      }
    }
    globalObject.ImageWebWorker = ImageWebWorker;
  }
})(window);
