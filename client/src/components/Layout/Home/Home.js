import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/fontawesome-free-6.1.0-web/css/all.min.css";
import classNames from "classnames/bind";
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from "react-compare-slider";
import FileUploadScreen from "../../../screens/FileUploadScreen";
import { getSingleFiles } from "../../../data/api";
import styles from "./Home.module.scss";
import img1 from "../../../assets/img/img1.png";
import img2 from "../../../assets/img/img2.png";
import logo from "../../../assets/img/logo3.png";
import Login from "../LogIn/Login";
const cx = classNames.bind(styles);

function Home() {
    const [stateMenu, setStateMenu] = useState("block");
    const [stateClose, setStateClose] = useState("none");
    const [isLogined, setIsLogined] = useState(false);

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

    //Prevent scroll event when login layout appears
    function disable() {
        // To get the scroll position of current webpage
        let TopScroll =
            window.pageYOffset || document.documentElement.scrollTop;
        let LeftScroll =
            window.pageXOffset || document.documentElement.scrollLeft;
        // if scroll happens, set it to the previous value
        window.onscroll = function () {
            window.scrollTo(LeftScroll, TopScroll);
        };
    }

    function enable() {
        window.onscroll = function () {};
    }

    const handleScroll = (e) => {
        if (e.target.checked) {
            disable();
        } else {
            enable();
        }
    };

    const handleSideBar = () => {
        if (stateMenu === "block") {
            setStateMenu("none");
            setStateClose("block");
        } else {
            setStateMenu("block");
            setStateClose("none");
        }
    };

    // =================Get Single Files===================
    const [singleFiles, setSingleFiles] = useState([]);

    const getSingleFilesList = async () => {
        try {
            const fileslist = await getSingleFiles();
            setSingleFiles(fileslist);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleFilesList();
    }, []);

    return (
        <>
            <div className={`${cx("Home")} ${"grid"}`}>
                <div className={`${cx("header")} ${"row"}`}>
                    <div className={`${cx("Bar")} ${"col l-12 m-12 c-12"}`}>
                        <div className="row">
                            <div
                                className={`${cx(
                                    "barLogo"
                                )} ${"col l-3 m-3 c-3"}`}
                            >
                                <Link to="/">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </div>
                            <div
                                className={`${cx(
                                    "containerBar"
                                )} ${"col l-9 m-9 c-9"}`}
                            >
                                <div className={`${cx("navBar")} ${""}`}>
                                    <div className="row">
                                        <Link
                                            to="/help"
                                            className={`${cx(
                                                "navBarBtnHelp"
                                            )} ${""}`}
                                        >
                                            Help
                                        </Link>

                                        <label
                                            htmlFor="nav__input-login"
                                            className={`${cx(
                                                "navBarBtnLogin"
                                            )} ${""}`}
                                        >
                                            {isLogined ? (
                                                <p>My Account</p>
                                            ) : (
                                                <p>Login / Sign Up</p>
                                            )}
                                        </label>
                                    </div>
                                </div>
                                <div
                                    className={`${cx(
                                        "sideBar"
                                    )} ${"col l-0 m-0 c-10"}`}
                                >
                                    <div
                                        className={`${cx(
                                            "sideBarMenuBtn"
                                        )} ${stateMenu}`}
                                    >
                                        <i
                                            className="fa-solid fa-bars"
                                            onClick={() => handleSideBar()}
                                        ></i>
                                    </div>
                                    <div
                                        className={`${cx(
                                            "sideBarContent"
                                        )} ${stateClose}`}
                                    >
                                        <div className="row">
                                            <div
                                                className={`${cx(
                                                    "sideBarContentBtn"
                                                )} ${"c-2"}`}
                                            >
                                                <i
                                                    className="fa-light fa-x"
                                                    onClick={() =>
                                                        handleSideBar()
                                                    }
                                                ></i>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <Link
                                                to="/help"
                                                className={`${cx(
                                                    "sideBarBtn"
                                                )} ${"c-10 c-o-1"}`}
                                            >
                                                Help
                                            </Link>
                                        </div>
                                        <div className="row">
                                            <label
                                                htmlFor="nav__input-login"
                                                className={`${cx(
                                                    "sideBarBtn"
                                                )} ${"c-10 c-o-1"}`}
                                            >
                                                {JSON.parse(
                                                    localStorage.getItem(
                                                        "isLogined"
                                                    )
                                                ) ? (
                                                    <p>My Account</p>
                                                ) : (
                                                    <p>Login / Sign Up</p>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${cx("body")} ${"row"}`}>
                    <ReactCompareSlider
                        className={`${cx(
                            "backGroundSlide"
                        )} ${"col l-7 m-12 c-12"}`}
                        itemOne={
                            <ReactCompareSliderImage
                                src={img2}
                                srcSet={img1}
                                alt="Image one"
                            />
                        }
                        itemTwo={
                            <ReactCompareSliderImage
                                src={img1}
                                srcSet={img2}
                                alt="Image two"
                            />
                        }
                    />
                    <div
                        className={`${cx("container")} ${"col l-5 m-12 c-12"}`}
                    >
                        <div className={`${cx("contentContainer")} ${"row"}`}>
                            <div className={`${cx("content")} ${""}`}>
                                <div className={`${cx("contentTitle")} ${""}`}>
                                    Enhance image quality with AI in 1 step
                                </div>
                                <div className={`${cx("contentBody")} ${""}`}>
                                    IE Photo Enhancer uses Artificial
                                    Intelligence to help you improve, sharpen
                                    your photos instantly.
                                </div>
                                <div className={`${cx("contentUpload")} ${""}`}>
                                    <FileUploadScreen
                                        getsingle={() => getSingleFilesList()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className={`${cx(
                                    "footer"
                                )} ${"col l-8 m-6 c-6 l-o-4 m-o-3 c-o-3"}`}
                            >
                                <div
                                    className={`${cx("footerBtnCookie")} ${""}`}
                                >
                                    Your cookie preferencres
                                </div>
                                <div className={`${cx("footerContent")} ${""}`}>
                                    Address: lane 82 Duy Tan Street, Dich Vong
                                    Hau, Cau Giay, Hanoi, Vietnam- Developed by
                                    IE team is subject to the management and
                                    coordination of Techainer.
                                    <br />© 2022 IE team
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input
                type="checkbox"
                id="nav__input-login"
                className={cx("nav__input")}
                onChange={handleScroll}
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

export default Home;
