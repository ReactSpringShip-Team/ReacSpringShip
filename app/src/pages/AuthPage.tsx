import { useState } from "react";
import { LoginForm } from "../features/auth/components/LoginForm"
import { RegisterForm } from "../features/auth/components/RegisterForm";
import { BackButton } from "../shared/components/BackButton";
import { useLocation } from "react-router-dom";

type formView = 'login' | 'register';

export const AuthPage = () => {
  
  const location = useLocation();
  const initialView = location.state?.view || 'login';

  const [view, setView] = useState<formView>(initialView);

  return (
    <div className="relative min-h-screen bg-[#051124] flex flex-col items-center justify-center">

     <BackButton/>

      {/* TABS */}
      <div className="flex gap-8 items-center text-white mb-6">
        <button
          className={`px-6 py-2 border-b-2 rounded-xl uppercase tracking-wider text-xl transition-all cursor-pointer
          ${ view === 'login' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          onClick={()=> setView('login')}
        >
          Login
        </button>
        <button
          className={`px-6 py-2 border-b-2 rounded-xl uppercase tracking-wider text-xl transition-all cursor-pointer
          ${ view === 'register' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          onClick={()=> setView('register')}
        >
          Register
        </button>
      </div>

      {/* FORMS CONTAINER */}
      <div className="w-full max-w-2xl flex justify-center items-start min-h-125">
        { view === 'login' ? <LoginForm setView={setView}/> : <RegisterForm setView={setView}/>}
      </div>
      
    </div>
  )
}