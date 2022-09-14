'use strict';

const express = require('express');
const { upload } = require('../helpers/filehelpers');
const {singleFileUpload,  getallSingleFiles} = require('../controllers/fileUploadController');
const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.get('/getallSingleFiles', getallSingleFiles);
module.exports = {
    routes: router,
}