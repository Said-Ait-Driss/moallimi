import axios from 'axios';
import { BACKEND_URL } from '@/utils/constants';

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', Optional: Add authorization token if needed
    }
});

export default axiosInstance;
