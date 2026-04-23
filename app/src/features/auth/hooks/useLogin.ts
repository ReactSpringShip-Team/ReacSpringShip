import { useForm, type SubmitHandler } from "react-hook-form"
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useNotification } from "../../../shared/context/NotificationContext";
import axios from "axios";

interface LoginFields {
    username: string;
    password: string;
}

export const useLogin = () => {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<LoginFields>();
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showNotification } = useNotification();

    const onSubmit: SubmitHandler<LoginFields>  = async (data) => {
    try{
        const response = await authService.login(data.username, data.password);
        console.log('Login succed', response);
        login(response.token); 
        navigate('/home');
    }catch(error){
        let errorMessage = "Invalid credentials";

        if (axios.isAxiosError(error) && error.response) {
            const serverData = error.response.data;
            
            if (serverData.validationErrors && typeof serverData.validationErrors === 'object') {
                errorMessage = Object.values(serverData.validationErrors).join(", ");
            } else {
                errorMessage = serverData.message || serverData.error || errorMessage;
            }
        }

        console.log("Error in the login", error);
        showNotification(errorMessage, "error");
    }

    }
  return {
    // Atributes
    register,
    errors,
    isSubmitting,
    // Methods
    handleSubmit,
    onSubmit,
  }
}
