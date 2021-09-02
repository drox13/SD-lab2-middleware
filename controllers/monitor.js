
const imgUpload = (req, res) => {
    const byteContent = req.file
    console.log(byteContent);
    if(byteContent) {
        res.send('Image Uploaded!')
    } else {
        res.send('Something went wrong :c')
    }
}

module.exports = {
    imgUpload
   }