import axios from "axios";
import {useAuthStore} from "@/stores/auth.store.js";

const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type' : 'application/json'
    }
});

axiosInstance.interceptors.request.use(config => {
    const user = useAuthStore();
    if (user?.authenticated){
        config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config;
});

axiosInstance.interceptors.response.use(response => response.data,
    error => {
        const user = useAuthStore();
        if([403].includes(error.response?.status) && user){
            user.signOut();
        }
        return Promise.reject(error.response?.data); //data?.message || error.message
    }
)

export const fetchWrapper = {
    GET: (url) => axiosInstance.get(url),
    POST: (url,body) => axiosInstance.post(url,body),
    PUT: (url,body) => axiosInstance.put(url,body),
    DELETE: (url,body) => axiosInstance.delete(url,body)
};