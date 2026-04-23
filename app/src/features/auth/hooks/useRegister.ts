import { useForm, type SubmitHandler } from "react-hook-form"
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../shared/context/NotificationContext";
import axios from "axios";

type RegisterFields = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export const useRegister = () => {
    const { register, handleSubmit, watch, formState: {errors, isSubmitting} } = useForm<RegisterFields>();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
      try {
        const response = await authService.register(
            data.username,
            data.email,
            data.password
        );
        
        console.log("Registro exitoso:", response);
        showNotification("Registration successful! Please log in.", "success");
        navigate('/auth', {state: { view: 'login' }});
        
      } catch (error) {
        let errorMessage = "Registration failed";

        if (axios.isAxiosError(error) && error.response) {
            const serverData = error.response.data;
            
            // Prioritize validationErrors if they exist, then message, then error
            if (serverData.validationErrors && typeof serverData.validationErrors === 'object') {
                errorMessage = Object.values(serverData.validationErrors).join(", ");
            } else {
                errorMessage = serverData.message || serverData.error || errorMessage;
            }
        }

        console.error("Error en el registro:", error);
        showNotification(errorMessage, "error");
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
