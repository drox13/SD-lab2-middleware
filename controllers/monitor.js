const axios = require('axios')
const Jimp = require('jimp')
//to commit commentxd
const imgUpload = (req, res) => {
    const byteContent = req.file
    if (byteContent) {
        axios.post('http://127.0.0.1:4000/image',
            byteContent).then(function (response) {
                res.send(response.data)
            }).catch(err => {
                console.log(err)
            });
    } else {
        res.send('Something went wrong :c')
    }
}

module.exports = {
    imgUpload
}