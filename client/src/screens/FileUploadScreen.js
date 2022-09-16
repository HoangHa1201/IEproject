import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { singleFileUpload } from '../data/api';
import classNames from 'classnames/bind';
import styles from './FileUploadScreen.module.scss';
const cx = classNames.bind(styles);

const FileUploadScreen = (props) => {
    let navigate = useNavigate();
    const handleChange = () => {
        navigate('/download');
    }
    const uploadSingleFile = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        await singleFileUpload(formData);
        props.getsingle();
    }
    return (
        <>
            <input type='file' accept='image/*' className={`${cx('contentUploadInput')} ${''}`} onChange={(e) => {
                uploadSingleFile(e)
                handleChange()
            }} />
            <div className={`${cx('contentUploadContainer')} ${''}`}>
                <i className={`${cx('contentUploadIcon')} ${'fa-solid fa-cloud-arrow-up'}`}></i>
                <div className={`${cx('contentUploadDrop')} ${''}`}>
                    <p>Drag and drop your image here</p>
                </div>
                <div className={`${cx('contentUploadFooter')} ${''}`}>
                    By continuing, you accept our Terms of Service and acknowledge receipt of our Privacy and Cookie Policy
                </div>
            </div>

        </>
    );
}

export default FileUploadScreen;