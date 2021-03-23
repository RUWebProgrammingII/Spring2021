/**

  API information.

  Base URL: https://api.deepai.org/api/colorizer
  Key: <obtain-your-own-key>

*/

onmessage = e => {
  const workerData = e.data;
  switch (workerData.type) {
    case 'display': displayImage(workerData.data);
      break;
    case 'colorize': colorizeImage(workerData.data);
      break;
  }
}

function displayImage(data) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const result = e.target.result;
    postMessage(result); // Return the data back to the main thread
  };

  reader.readAsDataURL(data[0]);
}

function colorizeImage(data) {
  const formData = new FormData();
  formData.append('image', data.split(',')[1]);
  fetch('https://api.deepai.org/api/colorizer', {
    method: 'POST',
    headers: {
      'api-key': '<obtain-your-own-key>'
    },
    body: formData
  }).then(result => {
    if (result.ok) {
      return result.json();
    }
  }).then(d => {
    postMessage(d.output_url);
  });
}
