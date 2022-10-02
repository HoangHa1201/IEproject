"use strict";

const express = require("express");
const { upload } = require("../helpers/filehelpers");
const {
    singleFileUpload,
    getallSingleFiles,
} = require("../controllers/fileUploadController");
const router = express.Router();

//save to gg drive
const fileSaveToDrive = require("../controllers/fileSaveToDrive");

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.get("/getallSingleFiles", getallSingleFiles);
module.exports = {
    routes: router,
};
//test save to ggdrive
router.post("/save", fileSaveToDrive);
