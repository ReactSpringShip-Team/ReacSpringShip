import { useForm, type SubmitHandler } from "react-hook-form"
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

interface LoginFields {
    username: string;
    password: string;
}

export const useLogin = () => {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<LoginFields>();
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit: SubmitHandler<LoginFields>  = async (data) => {
    try{
        const response = await authService.login(data.username, data.password);
        console.log('Login succed', response);
        login(response.token); // <-- verificar la estructura del result
        navigate('/home');
    }catch(error){
        console.log("Error in the login", error);
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
