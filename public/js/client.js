window.onload = function () {
    document.getElementById('uploadImageButton').addEventListener('click', upload);
}

function upload() {
    let image = document.getElementById('imageSelector').files[0]; 
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/', true);
        xhr.onreadystatechange = function() {
            if ( 4 == this.readyState ) {
                console.log(xhr.response);
            }
        };
        var formData = new FormData();
        formData.append("image", image);
        xhr.send(formData);
}