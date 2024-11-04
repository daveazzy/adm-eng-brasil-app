import axios from 'axios';
import { AppError } from '../utils/AppError';

const api = axios.create({
    baseURL:'https://independent-minnow-daveazzy-f6c4f298.koyeb.app/'
});


api.interceptors.response.use(response => response, error => {
    if(error.response && error.response.data){
        return Promise.reject(new AppError(error.response.data.message));
    } else {
        return Promise.reject(error);
    }
})


export { api };