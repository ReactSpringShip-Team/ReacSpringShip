import { ErrorMessage } from "../../../shared";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { useLogin } from "../hooks/useLogin";

interface Props {
    setView: (view: 'login' | 'register') => void;
}

export const LoginForm = ({ setView} : Props) => {
    const {register, handleSubmit, onSubmit, errors, isSubmitting} = useLogin();
  return (
    <div className="w-full max-w-2xl border-2 rounded-xl border-cyan-400 py-8 backdrop-blur-md shadow-[0_0_20px_#22d3ee] bg-blue-900/20">
        
        <form onSubmit={handleSubmit(onSubmit)} className="text-white flex flex-col items-center text-xl font-sans select-none ">
            <h1 className="text-5xl mb-10 italic font-bold drop-shadow-[0_0_15px_#fff]">Log into your account</h1>

           <div className="w-full max-w-sm flex flex-col items-start"> 
                <Input type="text" placeholder="Username" {...register("username", {
                required: 'Username is required'
                })}/>
                <ErrorMessage message={errors.username?.message} /> 
           </div>

            <div className="w-full max-w-sm flex flex-col items-start">
                <Input type="password" placeholder="Password" {...register("password", {
                required: 'Password is required'
                })}/>
                <ErrorMessage message={errors.password?.message} />
            </div>

            <Button text="Login" btnType="submit" disabled={isSubmitting}/>

            <p 
            className="text-sm mt-5">Dont have an account?
                <span 
                    onClick={() => setView('register')} 
                    className="cursor-pointer font-bold text-white hover:text-cyan-400 pl-2 transition-colors"
                >
                Register here
            </span>
        </p>
        </form>
    </div>
  )
}
