const axios = require('axios')
const Jimp = require('jimp')
const CircularList = require('../dataStructure/CircularList')
const Node = require('../dataStructure/Node')

const circularList = new CircularList();
let node2 = new Node("instancia2");
let node3 = new Node("instancia3");
circularList.addNode(node2);
circularList.addNode(node3);
var instance = circularList.pointer.data;
var instancesNumber = 3;


const imgUpload = (req, res) => {
    const byteContent = req.file
    if (byteContent) {
        console.log(instance.charAt(instance.length-1));
        let request = `http://119.18.0.${instance.charAt(instance.length-1)}:4000/image` //puerto 4000 no debe cambiar
        console.log("INSTANCIA!!!" + instance);
        axios.post(request, 
            byteContent).then(function (response) {
                res.send(response.data)
            }).catch(err => {
                console.log(err)
            });
            instance = circularList.nextPointer().data;
            
            console.log("NUEVO APUNTADOR ES: ", instance);
    } else {
        res.send('Something went wrong :c')
    }
}

module.exports = {
    imgUpload
}