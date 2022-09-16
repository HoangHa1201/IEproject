import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);

function Login() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogined, setIsLogined] = useState(false);
    ///Hello this is Login file

    localStorage.setItem("isLogined", JSON.stringify(isLogined));

    const login = () => {
        setLoading(false);
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const logout = () => {
        setLoading(true);
        setTimeout(() => {
            window.open("http://localhost:5000/auth/logout", "_self");
            setIsLogined(false);
        }, 1000);
    };

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
                    setUser(data.user);
                    setIsLogined(!!data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        getUser();
    }, []);

    return (
        <div className={`${cx("login")}`}>
            <label
                htmlFor="nav__input-login"
                className={cx("login__left--close")}
            >
                &times;
            </label>
            <div className={cx("login__left")}>
                <img src="https://i-english.vnecdn.net/2019/09/19/5d79f4b9b36f1-the-50-best-phot-9333-9868-1568862470.png" />
                <div className={cx("login__left-description")}>
                    <h3 className={cx("login__left-title")}>
                        Get Unlimited Downloads
                    </h3>
                    <ul className={cx("login__left-list")}>
                        <li className={cx("login__left-item")}>
                            <img src="https://app.remini.ai/_next/static/media/check--yellow.e8f87402.svg"></img>
                            <h3>Enhance Details</h3>
                        </li>
                        <li className={cx("login__left-item")}>
                            <img src="https://app.remini.ai/_next/static/media/check--yellow.e8f87402.svg"></img>
                            <h3>Improve Portraits</h3>
                        </li>
                        <li className={cx("login__left-item")}>
                            <img src="https://app.remini.ai/_next/static/media/check--yellow.e8f87402.svg"></img>
                            <h3>Fix Blurry Photos</h3>
                        </li>
                        <li className={cx("login__left-item")}>
                            <img src="https://app.remini.ai/_next/static/media/check--yellow.e8f87402.svg"></img>
                            <h3>Enlarge Images</h3>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx("login__right")}>
                {JSON.parse(localStorage.getItem("isLogined")) ? (
                    <div className={cx("login__right--active")}>
                        {/* Logined */}
                        <h4>Account</h4>

                        <div className={cx("login__right--details")}>
                            <img src="https://app.remini.ai/_next/static/media/google.d8efdb16.svg" />
                            <div className={cx("login__right--infors")}>
                                <h5>Google Account</h5>
                                <p>{user.emails[0].value}</p>
                            </div>
                            <button
                                className={cx("login__right--btn")}
                                onClick={logout}
                            >
                                {loading ? (
                                    <div className={cx("circle")}></div>
                                ) : (
                                    <>
                                        <span>Logout</span>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            class="ml-2 "
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M14 2L14 8L12 8L12 5.41421L7.70711 9.70711L6.29289 8.29289L10.5858 4L8 4L8 2L14 2Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M2 14L2 5L4 5L4 12L11 12L11 14L2 14Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={cx("login__right-container")}>
                        {/* Chưa login */}
                        <div className={cx("login__right-title")}>
                            <h3>Login / Sign Up</h3>
                        </div>

                        <div className={cx("login__right-description")}>
                            <p>
                                Sign in or create your account to download
                                images without watermark
                            </p>
                        </div>

                        <div className={cx("login__right-list")}>
                            <button
                                className={cx("login__right-item")}
                                onClick={login}
                            >
                                <img src="https://app.remini.ai/_next/static/media/google.5c8e11c8.svg" />
                                <h3>Continue With Google</h3>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;