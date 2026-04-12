import { useForm, type SubmitHandler } from "react-hook-form"
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

type RegisterFields = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export const useRegister = () => {
    const { register, handleSubmit, watch, formState: {errors, isSubmitting} } = useForm<RegisterFields>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
      try {
        const response = await authService.register(
            data.username,
            data.email,
            data.password
        );
        
        console.log("Registro exitoso:", response);
        navigate('/auth', {state: { view: 'login' }});
        
      } catch (error) {
       
        console.error("Error en el registro:", error);
      }
    }

  return {
    // Atributes
    register,
    watch,
    errors,
    isSubmitting,
    // Functions
    handleSubmit,
    onSubmit
  }
}
