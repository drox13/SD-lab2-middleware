window.onload = function () {
	document.getElementById('uploadImageButton').addEventListener('click', upload);
};

function upload() {
	let image = document.getElementById('imageSelector').files[0];
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:8000/', true);
	xhr.onreadystatechange = function () {
		if (4 == this.readyState) {
			let body = JSON.parse(xhr.response);
			console.log(body);
			let arrayBufferView = new Uint8Array(body.buffer.data);
			let blob = new Blob([arrayBufferView], { type: 'image/png' });
			let urlCreator = window.URL || window.webkitURL;
			let imageUrl = urlCreator.createObjectURL(blob);
			let img = document.getElementById('imageReceived');
			console.log(imageUrl);
			img.src = imageUrl;
			img.onload = () => {
				const canvas = document.getElementById('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
			};
		} else {
			let body = JSON.parse(xhr.response);
			alert(body.msg);
			sendEmail();
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
		Username: 'info.status.server2021@gmail.com',
		Password: '0A6D6EB06B8060CC68900BBA5392309F5831',
		To: 'brayan.cardenas@uptc.edu.co, dario.baron@uptc.edu.co',
		From: 'info.status.server2021@gmail.com',
		Subject: 'Test de Email',
		Body: 'Server Failed!',
		// A7291F7098E3075AFB8D969DF285648A01D8
		//03A4A62AF5A741A8A9DE1D1FEAE59460FFD1C6E144D4049DAEA302F3C456288B951F62BC7E30DCFD877D8E5C75384953
		//E656843A82B1EBE168CE748F004148C0316A
	}).then((message) => alert(message));
}
