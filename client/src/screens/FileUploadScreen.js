import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { singleFileUpload } from "../data/api";
import classNames from "classnames/bind";
import styles from "./FileUploadScreen.module.scss";
import { ImageState } from "../components/Context/ImageProvider.js";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const FileUploadScreen = (props) => {
    let navigate = useNavigate();
    const { setBeforeImage, setAfterImage, setLoading } = ImageState();

    const handleChange = () => {
        navigate("/download");
    };
    const uploadSingleFile = async (e) => {
        // const formData = new FormData();
        // formData.append("file", e.target.files[0]);
        // await singleFileUpload(formData);
        // props.getsingle();

        //call API : { data } = await axios... --> setAfter__img(data.output)
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
    return (
        <>
            <input
                type="file"
                accept="image/*"
                className={`${cx("contentUploadInput")} ${""}`}
                onChange={(e) => {
                    uploadSingleFile(e);
                    handleChange();
                }}
            />
            <div className={`${cx("contentUploadContainer")} ${""}`}>
                <i
                    className={`${cx(
                        "contentUploadIcon"
                    )} ${"fa-solid fa-cloud-arrow-up"}`}
                ></i>
                <div className={`${cx("contentUploadDrop")} ${""}`}>
                    <p>Drag and drop your image here</p>
                </div>
                <div className={`${cx("contentUploadFooter")} ${""}`}>
                    By continuing, you accept our Terms of Service and
                    acknowledge receipt of our Privacy and Cookie Policy
                </div>
            </div>
        </>
    );
};

export default FileUploadScreen;
