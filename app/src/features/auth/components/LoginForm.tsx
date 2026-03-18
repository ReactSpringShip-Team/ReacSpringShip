import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";

const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login");
}
export const LoginForm = () => {
  return (
    <div className="w-full max-w-2xl border-2 rounded-xl border-cyan-400 py-12 backdrop-blur-md shadow-[0_0_20px_#22d3ee] bg-blue-900/20">
        <form onSubmit={submitLogin} className="text-white flex flex-col items-center text-xl font-sans select-none ">
            <h1 className="text-4xl mb-6 italic font-bold drop-shadow-[0_0_15px_#fff]">Login into your account</h1>

            <Input type="text" placeHolder="Username"/> 

            <Input type="password" placeHolder="Password"/>

            <Button text="Login"/>

            <p 
            className="text-sm mt-5">Dont have an account?
            <strong>
                <Link to="/register" className="cursor-pointer hover:text-gray-400 pl-2">Register here</Link>
            </strong>
            </p>
        </form>
    </div>
  )
}
