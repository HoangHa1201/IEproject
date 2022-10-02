import { createContext, useContext, useState, useEffect } from "react";

const ImageContext = createContext();

function ImageProvider({ children }) {
    const [beforeImage, setBeforeImage] = useState("");
    const [afterImage, setAfterImage] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <ImageContext.Provider
            value={{
                beforeImage,
                setBeforeImage,
                afterImage,
                setAfterImage,
                loading,
                setLoading,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}

export const ImageState = () => {
    return useContext(ImageContext);
};

export default ImageProvider;
