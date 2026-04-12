import { useForm, type SubmitHandler } from "react-hook-form"
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

interface LoginFields {
    username: string;
    password: string;
}

export const useLogin = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<LoginFields>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<LoginFields>  = async (data) => {
    try{
        const result = await authService.login(data.username, data.password);
        console.log('Login succed', result);
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
