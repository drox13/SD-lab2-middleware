const express = require('express');
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const CircularList = require('../dataStructure/CircularList')
const Node = require('../dataStructure/Node')
const PORT = 8000;

class Server {
	constructor() {
		this.app = express();
		this.port = PORT;
		this.middleware();
		this.routes();
	}

	middleware() {
		this.app.use(cors());
		this.app.use(express.json())
		this.app.use(express.static('public'));
		this.app.use(multer({
			fileFilter : (req,file,cb) => {
				const fileTypes = /jpeg|jpg|png|gif/;
				const mimeType = fileTypes.test(file.mimetype);
				const nameExt = fileTypes.test(path.extname(file.originalname));
				if (mimeType && nameExt) {
					return cb(null, true)
				}
				cb('Invalid file Type, Please try Image (JPG, JPEG, PNG, GIF)')
			}
		}).single('image'))
	}

	routes() {
		this.app.use('/', require('../routes/monitor'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server on! PORT ${this.port}`);
		});
	}

	testCircularList() {
		const circularList = new CircularList();
		let node1 = new Node("instancia2");
		let node2 = new Node("instancia3");
		circularList.addNode(node1);
		circularList.addNode(node2);
		//circularList.removeNode(node1);
		circularList.showList();
	}
}

module.exports = Server;



		//this.testCircularList();
		
// const storage = multer.diskStorage({
//     destination: __dirname + '/public/uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// })

// const multerFilter = multer({
// 	fileFilter : (req,file,cb) => {
// 		const fileTypes = /jpeg|jpg|png|gif/;
// 		const mimeType = fileTypes.test(file.mimetype);
// 		const nameExt = fileTypes.test(path.extname(file.originalname));
// 		if (mimeType && nameExt) {
// 			return cb(null, true)
// 		}
// 		cb('Invalid file Type, Please try Image (JPG, JPEG, PNG, GIF)')
// 	}
// }).single;