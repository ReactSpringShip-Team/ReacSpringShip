
import { ErrorMessage } from "../../../shared";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { useRegister } from "../hooks/useRegister";

interface Props {
  setView: (view : 'login' | 'register') => void;
}

export const RegisterForm = ({ setView }: Props) => {
  const { register, watch, errors, handleSubmit, onSubmit } = useRegister();
  const password = watch('password');

  return (
    <div className="w-full max-w-2xl select-none bg-blue-900/20 border-2 rounded-2xl backdrop-blur-md border-cyan-400 py-8 shadow-[0_0_20px_#22d3ee]">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col font-sans text-white items-center px-8"
      >
        <h1 className="text-5xl italic font-bold mb-10 drop-shadow-[0_0_15px_#fff]">Register</h1>

        {/* Username */}
        <div className="w-full max-w-sm flex flex-col items-start">
          <Input type="text" color={errors.username ? "red" : "pink"} placeholder="Username" {...register("username", {
          required: "Username is required",
          minLength: { value: 3, message: 'At least 3 characters' }
          })}/>
          <ErrorMessage message={errors.username?.message} />
        </div>
        
        {/* Email */}
        <div className="w-full max-w-sm flex flex-col items-start">
          <Input type="email" color={errors.email ? "red" : "pink"} placeholder="User@email.com" {...register("email", {
          required: "Enter a valid email",
        })}/>
          <ErrorMessage message={errors.email?.message} />
        </div>

        {/* Password */}
        <div className="w-full max-w-sm flex flex-col items-start">
          <Input type="password" color={errors.password ? "red" : "pink"} placeholder="Password" {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: 'At least 5 characters' }
          })}/>
          <ErrorMessage message={errors.password?.message} />
        </div>

        {/* Confirm Password */}
        <div className="w-full max-w-sm flex flex-col items-start">
          <Input type="password" color={errors.confirmPassword ? "red" : "pink"} placeholder="Confirm password" {...register("confirmPassword", {
            validate: (value) => value === password || "Passwords do not match"
          })}/>
          <ErrorMessage message={errors.confirmPassword?.message} />
        </div>
       
        <Button text="Register" btnType="submit" />
        
        <p className="text-sm mt-5">
          Do you have an account?
          <span 
            onClick={() => setView('login')} 
            className="cursor-pointer font-bold text-white hover:text-cyan-400 pl-2 transition-colors"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};