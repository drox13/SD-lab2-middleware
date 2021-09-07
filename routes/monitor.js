const { Router } = require('express');
const { imgUpload, createNewinstance } = require('../controllers/monitor');

const router = Router();

router.post('/', imgUpload);

router.get('/instance', createNewinstance);

module.exports = router;
