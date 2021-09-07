const axios = require('axios')
const Jimp = require('jimp')
const CircularList = require('../dataStructure/CircularList')
const Node = require('../dataStructure/Node')
const fs = require('fs');

const circularList = new CircularList();
let node2 = new Node("instancia2");
let node3 = new Node("instancia3");
circularList.addNode(node2);
circularList.addNode(node3);
var instance = circularList.pointer.data;

const imgUpload = (req, res) => {
    const byteContent = req.file
    if (byteContent) {
        let request = `http://119.18.0.${instance.charAt(instance.length-1)}:4000/image` //puerto 4000 no debe cambiar
        
        axios.post(request, byteContent)
            .then(function (response) {
                writeLog("\n Ok " + instance + " " + new Date());
                instance = circularList.nextPointer().data;
                res.send(response.data)
            }).catch(err => {
                writeLog("\n Error " + instance + " " + new Date());
                instance = circularList.nextPointer().data;
                console.log(err);
				res.status(500).json({
					msg: 'error',
				});
            });
    } else {
        res.send('Something went wrong :c');
    }
}

const PATH = process.cwd();
const urlLogs = PATH + "/logers/Hystory.log"

function createFileLogs(){
    fs.open(urlLogs, 'r', function (err, f) {
    });
}

function writeLog(data){
    createFileLogs()
    fs.appendFile(urlLogs, data, (err) => {
        if (err)
          console.log(err);
      });
}
module.exports = {
	imgUpload,
};
