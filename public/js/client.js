window.onload = function () {
    document.getElementById('uploadImageButton').addEventListener('click', upload);
}

function upload() {
    let image = document.getElementById('imageSelector').files[0];
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/', true);
    xhr.onreadystatechange = function () {
        if (4 == this.readyState) {
            let canvas = document.getElementById('myCanvas')
            let data = JSON.parse(xhr.response)
            var ctx = canvas.getContext("2d");
            var imgData = ctx.createImageData(data.width, data.height);
            canvas.width = data.width;
            canvas.height = data.height;
            var i;
        for (i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i+0] = data.pixels.data[i+0];
            imgData.data[i+1] = data.pixels.data[i+1];
            imgData.data[i+2] = data.pixels.data[i+2];
            imgData.data[i+3] = data.pixels.data[i+3];
        }
        ctx.putImageData(imgData,0,0); 
        }
    };
    var formData = new FormData();
    formData.append("image", image);
    xhr.send(formData);
}