import axios from "axios";


const instance = axios.create({
    baseURL : 'https://library-backend-emt.herokuapp.com/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});
export default instance;