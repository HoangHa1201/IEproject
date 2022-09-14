'use strict';
const SingleFile = require('../models/singleFile');
const singleFileUpload = async (req, res) => {
    try {
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getallSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error){
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';

    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, index)).toFixed(dm)) + ' ' + sizes[index];
}

module.exports = {
    singleFileUpload,
    getallSingleFiles,
};
