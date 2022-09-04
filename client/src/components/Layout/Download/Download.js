import { Link } from 'react-router-dom';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import '../../../assets/fontawesome-free-6.1.0-web/css/all.min.css'
import classNames from 'classnames/bind';
import styles from './Download.module.scss';


import img1 from '../../../assets/img/test2.jpg';
import img2 from '../../../assets/img/zyro-image.png';
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
                    <Link to='/login'>
                        <span>Login</span>
                    </Link>
                </div>
            </div>

            <div className={`${cx('data')}`}>
                <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={img2} srcSet={img1} alt="Image one" />}
                    itemTwo={<ReactCompareSliderImage src={img1} srcSet={img2} alt="Image two" />}
                />
            </div>

            <div className={`${cx('footer')}`}>
                <div className={`${cx('footer-download-button')} ${cx('btn')}`}>
                    <Link to=''>
                        <span>Download</span>
                    </Link>
                </div>
                <div className={`${cx('footer-add-button')} ${cx('btn')}`}>
                    <Link to=''>
                        <span>Upload New Image</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Download;