window.onload = function () {
	document.getElementById('uploadImageButton').addEventListener('click', upload);
};

function upload() {
	let image = document.getElementById('imageSelector').files[0];
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:8000/', true);
	xhr.onreadystatechange = function () {

		if (4 == this.readyState) {
			let data = JSON.parse(xhr.response)
			alert(JSON.stringify(data))

			if (data.msg === 'error') {
				alert(data.msg);
				sendEmail();
				//console.log("client line 18",data);
			} else {

				let canvas = document.getElementById('myCanvas')
				var ctx = canvas.getContext("2d");
				var imgData = ctx.createImageData(data.width, data.height);
				canvas.width = data.width;
				canvas.height = data.height;
				var i;
				for (i = 0; i < imgData.data.length; i += 4) {
					imgData.data[i + 0] = data.pixels.data[i + 0];
					imgData.data[i + 1] = data.pixels.data[i + 1];
					imgData.data[i + 2] = data.pixels.data[i + 2];
					imgData.data[i + 3] = data.pixels.data[i + 3];
				}
				ctx.putImageData(imgData, 0, 0);
			}
		}
	};
	let formData = new FormData();
	formData.append('image', image);
	console.log(formData);
	xhr.send(formData);
}

function sendEmail() {
	Email.send({
		Host: 'smtp.elasticemail.com',
		Port: '2525',
		Username: 'bacardenas29@gmail.com',
		Password: 'E656843A82B1EBE168CE748F004148C0316A',
		To: 'brayan.cardenas@uptc.edu.co, dario.baron@uptc.edu.co',
		From: 'bacardenas29@gmail.com',
		Subject: 'Test de Email',
		Body: 'Server Failed!',
		// A7291F7098E3075AFB8D969DF285648A01D8
		//03A4A62AF5A741A8A9DE1D1FEAE59460FFD1C6E144D4049DAEA302F3C456288B951F62BC7E30DCFD877D8E5C75384953
		//E656843A82B1EBE168CE748F004148C0316A
	}).then((message) => alert(message));
}
