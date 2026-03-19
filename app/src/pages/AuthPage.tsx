import { useState } from "react";
import { LoginForm } from "../features/auth/components/LoginForm"
import { RegisterForm } from "../features/auth/components/RegisterForm";

type formView = 'login' | 'register';
export const AuthPage = () => {

  const [view, setView] = useState<formView>('login');
  return (
    <div className="min-h-screen bg-[#051124] flex flex-col items-center justify-center">

      <div className="flex gap-8 items-center text-white mb-6">
        <button
        className={`px-6 py-2 border-b-2 rounded-xl border-cyan-500 uppercase tracking-wider text-xl transition-all cursor-pointer
        ${ view === 'login' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        onClick={()=> setView('login')}>Login</button>
        <button
        className={`px-6 py-2 border-b-2 rounded-xl border-cyan-500 uppercase tracking-wider text-xl transition-all cursor-pointer
        ${ view === 'register' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        onClick={()=> setView('register')}>Register</button>
      </div>

      <div className="w-full max-2xl flex justify-center items-start min-h-125">
        { view === 'login' ? <LoginForm/> : <RegisterForm/>}
      </div>
    </div>
  )
}
