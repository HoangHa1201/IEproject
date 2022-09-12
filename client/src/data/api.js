import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/';

export const singleFileUpload = async (data) => {
    try {
        await axios.post(apiUrl + 'singleFile', data)
    } catch (error) {
        throw error
    }
}

export const getSingleFiles = async () => {
    try {
        const {data} = await axios.get(apiUrl + 'getallSingleFiles');
        return data;
    } catch (error) {
        throw error
    }
}
