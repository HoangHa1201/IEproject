import { Link } from 'react-router-dom';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
// import { useState } from 'react';

import '../../../assets/fontawesome-free-6.1.0-web/css/all.min.css'
import classNames from 'classnames/bind';
import styles from './Download.module.scss';


import before_img from '../../../assets/img/test2.jpg';
import after_img from '../../../assets/img/zyro-image.png';
import logo from '../../../assets/img/logo3.png'


const cx = classNames.bind(styles);

function Download() {

    return (
        <div>
            <div className={`${cx('header-wrapper')}`}>
                <div className={`${cx('header-logo')}`}>
                    <Link to='/'>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className={`${cx('header-login-button')} ${cx('btn')}`}>
                    <Link to='/login' className={`${cx('button-wrapper')}`}>
                        <span>Login</span>
                    </Link>
                </div>
            </div>

            <div className={`${cx('data')}`}>
                <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={before_img} alt="Image before modified" />}
                    itemTwo={<ReactCompareSliderImage src={after_img} alt="Image after modified" />}
                />
            </div>

            <div className={`${cx('footer')}`}>
                <div className={`${cx('footer-download-button')} ${cx('btn')}`}>
                    <a href={after_img} download = 'IE Image'>
                        <button className={`${cx('button-wrapper')}`}>
                            <span>Download</span>
                        </button>
                    </a>
                    {/* <button className={`${cx('button-wrapper')}`}>
                        <span>Download</span>
                    </button> */}
                </div>
                <div className={`${cx('footer-add-button')} ${cx('btn')}`}>
                    <input
                        id="image-upload-btn"
                        type='file'
                        accept='image/*'
                        value=''
                        onChange={(e) => {
                            console.log(e.target.files[0].name)
                        }}
                    />
                    <button
                        className={`${cx('button-wrapper')}`} type='button'
                        onClick={() => document.getElementById('image-upload-btn').click()}
                    >
                        <span>Upload New Image</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Download;