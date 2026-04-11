import { useForm, type SubmitHandler } from "react-hook-form"

type RegisterFields = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export const useRegister = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm<RegisterFields>();

    const onSubmit: SubmitHandler<RegisterFields> = (data) => {
      console.log(data);
    }

  return {
    // Atributes
    register,
    watch,
    errors,
    // Functions
    handleSubmit,
    onSubmit
  }
}
