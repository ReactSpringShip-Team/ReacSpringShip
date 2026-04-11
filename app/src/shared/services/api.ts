import axios from "axios";


export const api = axios.create({
    baseURL: 'localhost:8080',
    timeout: 10000, // 10 segundos maximo por request
    headers: {
        'Content-Type': 'application/json'
    }
});

