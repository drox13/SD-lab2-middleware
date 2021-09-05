const { Router } = require('express');
const { imgUpload } = require('../controllers/monitor');

const router = Router();

router.post('/', imgUpload)


module.exports = router;