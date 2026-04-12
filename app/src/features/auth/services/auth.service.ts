import { api } from "../../../shared/services/api";
import type { Login, Register } from "../types/auth.types";

export const authService = {
    
    register: async (username: string, email: string, password: string) => {
        const URL = '/api/v1/auth/register';
        const requestData: Register = {
            username: username,
            email: email,
            password: password
        }; 
        const { data } = await api.post(URL, requestData);
        return data;
    },

    login: async (username: string, password: string) => {
        const URL = '/api/v1/auth/login';
        const requestData: Login = {
            username: username,
            password: password
        };
        const { data } = await api.post(URL, requestData);
        return data;
    }
}