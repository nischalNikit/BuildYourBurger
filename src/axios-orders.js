import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-productio-675a8.firebaseio.com/"
});

export default instance;