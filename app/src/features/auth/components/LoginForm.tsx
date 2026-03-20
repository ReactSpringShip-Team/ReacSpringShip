import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";

interface Props {
    setView: (view: 'login' | 'register') => void;
}
const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login");
}

export const LoginForm = ({ setView} : Props) => {
  return (
    <div className="w-full max-w-2xl border-2 rounded-xl border-cyan-400 py-8 backdrop-blur-md shadow-[0_0_20px_#22d3ee] bg-blue-900/20">
        <form onSubmit={submitLogin} className="text-white flex flex-col items-center text-xl font-sans select-none ">
            <h1 className="text-5xl mb-10 italic font-bold drop-shadow-[0_0_15px_#fff]">Login into your account</h1>

            <Input type="text" placeHolder="Username"/> 

            <Input type="password" placeHolder="Password"/>

            <Button text="Login" btnType="submit"/>

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
