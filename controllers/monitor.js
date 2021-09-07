const axios = require('axios');
const Jimp = require('jimp');
const fs = require('fs');
const shell = require('shelljs');

const CircularList = require('../dataStructure/CircularList');
const Node = require('../dataStructure/Node');

const PATH = process.cwd();
const circularList = new CircularList();
let node2 = new Node('instancia2');
let node3 = new Node('instancia3');
circularList.addNode(node2);
circularList.addNode(node3);
let instance = circularList.pointer.data;

const imgUpload = (req, res) => {
	const byteContent = req.file;
	if (byteContent) {
		let request = `http://119.18.0.${instance.charAt(instance.length - 1)}:4000/image`; //puerto 4000 no debe cambiar

		axios
			.post(request, byteContent)
			.then(function (response) {
				writeLog('\n Ok ' + instance + ' ' + new Date());
				instance = circularList.nextPointer().data;
				res.send(response.data);
			})
			.catch((err) => {
				writeLog('\n Error ' + instance + ' ' + new Date());
				instance = circularList.nextPointer().data;
				console.log(err);
				res.status(500).json({
					msg: 'error',
					infoIP: request,
				});
			});
	} else {
		res.send('Something went wrong :c');
	}
};

const createNewinstance = (req, res) => {
	try {
		let numberInstance = fs.readFileSync(PATH + '/docker/counter.tmp', 'utf8');
		circularList.addNode(new Node(`instancia${numberInstance}`));
		circularList.showList();
		shell.exec(PATH + `/docker/new_instance.sh ${numberInstance}`);
		numberInstance++
		fs.writeFileSync(PATH + '/docker/counter.tmp', numberInstance)
	
		res.send({msg: 'New instance created'})
	} catch (error) {
		console.log(error);
	}
};

const urlLogs = PATH + '/logers/Hystory.log';

function createFileLogs() {
	fs.open(urlLogs, 'r', function (err, f) {});
}

function writeLog(data) {
	createFileLogs();
	fs.appendFile(urlLogs, data, (err) => {
		if (err) console.log(err);
	});
}
module.exports = {
	imgUpload,
	createNewinstance,
};
