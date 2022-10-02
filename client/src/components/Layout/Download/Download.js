import { Link } from "react-router-dom";
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from "react-compare-slider";
import { useState, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "../../../assets/fontawesome-free-6.1.0-web/css/all.min.css";
import classNames from "classnames/bind";
import styles from "./Download.module.scss";
import Loading from "./Loading.js";
import Login from "../LogIn/Login";

import before_img from "../../../assets/img/test2.jpg";
import after_img from "../../../assets/img/zyro-image.png";
import logo from "../../../assets/img/logo3.png";
import { ImageState } from "../../Context/ImageProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function Download() {
    const [isLogined, setIsLogined] = useState(false);
    const {
        afterImage,
        setAfterImage,
        beforeImage,
        setBeforeImage,
        loading,
        setLoading,
    } = ImageState();

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:5000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Controll-Allow-Credentials": true,
                },
            })
                .then((res) => {
                    if (res.status === 200) return res.json();
                    else {
                        throw new Error("Authenticate hass failed!");
                    }
                })
                .then((data) => {
                    setIsLogined(!!data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        getUser();
    }, [isLogined]);

    const handleChangeImage = async (e) => {
        setLoading(true);
        setBeforeImage(URL.createObjectURL(e.target.files[0]));
        try {
            const { data } = await axios({
                method: "post",
                url: "https://77420ec8453d.ap.ngrok.io/call/restore_image",
                data: {
                    input: e.target.files[0],
                },
                headers: { "Content-Type": "multipart/form-data" },
            });

            setLoading(false);
            setAfterImage(`data:image/png;base64,${data.output}`);
        } catch (error) {
            toast.error("Type of image could not be converted", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(error);
        }
    };

    //Copy URL Image to share
    const onCopy = () => {
        toast.success("Copied", {
            position: "bottom-right",
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    //Fail when post url image to server because request entity too large
    const handleUploadToDrive = async (image) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "image/jpeg",
                },
            };
            await axios.post("http://localhost:5000/api/save", {
                image,
                config,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <ToastContainer theme="dark" />
                <div className={`${cx("header-wrapper")}`}>
                    <div className={`${cx("header-logo")}`}>
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div
                        className={`${cx("header-login-button")} ${cx("btn")}`}
                    >
                        <label
                            htmlFor="nav__input-login"
                            className={`${cx("button-wrapper")}`}
                        >
                            {isLogined ? (
                                <span>My Account</span>
                            ) : (
                                <span>Login</span>
                            )}
                        </label>
                    </div>
                </div>

                <div className={`${cx("data")}`}>
                    {!loading ? (
                        <ReactCompareSlider
                            itemOne={
                                <ReactCompareSliderImage
                                    src={beforeImage}
                                    alt="Image before modified"
                                />
                            }
                            itemTwo={
                                <ReactCompareSliderImage
                                    src={afterImage}
                                    alt="Image after modified"
                                />
                            }
                        />
                    ) : (
                        <div>
                            <div className={`${cx("data-loading")}`}>
                                <span>Please wait...</span>
                                <Loading height={"10vw"} width={"10vw"} />
                                <span>While we enhancing your image</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`${cx("footer")}`}>
                    <div className={`${cx("footer-add-button")} ${cx("btn")}`}>
                        <input
                            id="image-upload-btn"
                            type="file"
                            accept="image/*"
                            value=""
                            onChange={handleChangeImage}
                        />
                        <button
                            className={`${cx("button-wrapper")}`}
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("image-upload-btn")
                                    .click()
                            }
                        >
                            <span>Upload New Image</span>
                        </button>
                    </div>
                    {!loading ? (
                        <>
                            <div
                                className={`${cx(
                                    "footer-download-button"
                                )} ${cx("btn")}`}
                            >
                                <a href={afterImage} download="IE Image">
                                    <button
                                        className={`${cx("button-wrapper")}`}
                                    >
                                        <span>Download</span>
                                    </button>
                                </a>
                            </div>

                            <div
                                className={`${cx("footer-share-button")} ${cx(
                                    "btn"
                                )}`}
                                onClick={() => handleUploadToDrive(afterImage)}
                            >
                                <CopyToClipboard
                                    onCopy={onCopy}
                                    text={afterImage}
                                    // onClick={() =>
                                    //     handleUploadToDrive(afterImage)
                                    // }
                                >
                                    <button
                                        className={`${cx("button-wrapper")}`}
                                    >
                                        <span>Share</span>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            <input
                type="checkbox"
                id="nav__input-login"
                className={cx("nav__input")}
            />
            <label
                htmlFor="nav__input-login"
                className={`${cx("overlay")}`}
            ></label>

            <div className={cx("modal__login")}>
                <Login />
            </div>
        </>
    );
}

export default Download;
