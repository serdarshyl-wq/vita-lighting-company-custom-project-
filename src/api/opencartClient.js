import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.vitalamps.online',
});

export default client;
