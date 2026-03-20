import { useState } from "react";
import { Link } from "react-router-dom"; // Added for navigation
import { ChevronLeft } from "lucide-react"; // Added for the icon
import { LoginForm } from "../features/auth/components/LoginForm"
import { RegisterForm } from "../features/auth/components/RegisterForm";

type formView = 'login' | 'register';

export const AuthPage = () => {
  const [view, setView] = useState<formView>('login');

  return (    <div className="relative min-h-screen bg-[#051124] flex flex-col items-center justify-center">

      <Link 
        to="/"
        className="absolute top-12 left-12 z-10 flex items-center gap-2 text-cyan-500 hover:text-cyan-300 transition-all duration-300 group cursor-pointer"
      >
        <ChevronLeft 
          size={36} 
          className="drop-shadow-[0_0_5px_#22d3ee] group-hover:drop-shadow-[0_0_15px_#67e8f9] transition-all duration-300" 
        />
        <span className="text-xl italic font-black uppercase tracking-widest drop-shadow-[0_0_5px_#22d3ee] group-hover:drop-shadow-[0_0_15px_#67e8f9] transition-all duration-300">
          Back
        </span>
      </Link>

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
        { view === 'login' ? <LoginForm/> : <RegisterForm/>}
      </div>
      
    </div>
  )
}