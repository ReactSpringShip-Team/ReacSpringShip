import { API_ENDPOINTS } from "../../../config/api";
import { api } from "../../../shared/services/api";
import type { Login, Register } from "../types/auth.types";

export const authService = {
    
    register: async (username: string, email: string, password: string) => {
        const requestData: Register = {
            username: username,
            email: email,
            password: password
        }; 
        const { data } = await api.post(API_ENDPOINTS.REGISTER, requestData);
        return data;
    },

    login: async (username: string, password: string) => {
        const requestData: Login = {
            username: username,
            password: password
        };
        const { data } = await api.post(API_ENDPOINTS.LOGIN, requestData);
        return data;
    }
}