// Username, email, password, confirm password

import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";

const submitRegister = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('register');
}

export const RegisterForm = () => {
  return (
    <div className="w-full max-w-2xl select-none bg-blue-900/20 border-2 rounded-2xl backdrop-blur-md border-cyan-400 py-12 shadow-[0_0_20px_#22d3ee] ">
      <form 
        onSubmit={submitRegister} 
        className="flex flex-col  font-sans text-white items-center">

        <h1 className="text-4xl italic font-bold mb-6 drop-shadow-[0_0_15px_#fff]">Register</h1>

        <Input type="text" color="pink" placeHolder="Username"/>

        <Input type="email" color="pink" placeHolder="User@email.com"/>

        <Input type="password" color="pink" placeHolder="Password"/>

        <Input type="password" color="pink" placeHolder="Confirm password"/>

        <Button text="Register" btnType="submit"/>

        <p className="text-sm mt-5">Do you have an account? 
            <strong>
              <Link to="/register" className="cursor-pointer hover:text-gray-400 pl-2">Login here</Link>
            </strong>
        </p>
      </form>
    </div>
  )
}
