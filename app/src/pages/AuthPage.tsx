import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BackButton } from "../shared";
import { LoginForm, RegisterForm } from "../features/auth";


type formView = 'login' | 'register';

export const AuthPage = () => {
  
  const location = useLocation();
  const [view, setView] = useState<formView>(location.state?.view || 'login');

  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view);
    }
  }, [location.state]);

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