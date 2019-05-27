import axios from 'axios/index';

const ingressocom = axios.create({
    baseURL: "https://api-content.ingresso.com/v0"
});
export default ingressocom;