import { useNavigate } from "react-router-dom"
import { Settings } from "lucide-react"
import { Button } from "../shared";
import { useAuth } from "../features/auth";

export const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const isLogged = () => {
  if (!isAuthenticated){
    return (
      <> 
          <Button text="Login" textSize="text-lg" color="pink" onClick={ ()=> navigate('/auth', {state: { view: 'login' }}) }/>
          <Button text="Signup" textSize="text-lg" color="purple" onClick={ ()=> navigate('/auth', {state: { view: 'register' }}) }/>
      </>
    );
  }

  return (
    <Button text="Logout" textSize="text-lg" onClick={ ()=>  logout()}/>  
  )
}
 
  return (
    <div className="min-h-screen bg-[#051124] flex flex-col text-white p-8 ">
      
      <header className="w-full flex justify-between items-start">
        <button className="text-cyan-500 hover:text-cyan-300 transition-colors cursor-pointer"
        onClick={()=> navigate('/settings')}
        >
          <Settings size={36} className="drop-shadow-[0_0_8px_#22d3ee]"/>
        </button>

      <div className="flex gap-4"> 
          {isLogged()}
      </div>

      </header>

      <main className="flex flex-col flex-1 justify-center items-center gap-16">
        
        <h1 className="text-6xl md:text-8xl font-black italic text-cyan-400 drop-shadow-[0_0_20px_#22d3ee] tracking-widest text-center select-none">
          ReactShip
        </h1>

        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          <Button text="Single-player" textSize="text-xl" color="green" onClick={()=> navigate('/single-player')}/>
          <Button text="Leaderboard" textSize="text-xl" color="blue" onClick={()=> navigate('/leaderboard')}/>
        </div>

      </main>

      <footer className="flex flex-col items-center gap-3 text-slate-400">
        <h5 className="uppercase tracking-widest text-sm font-bold text-slate-500">Credits</h5>
        <div className="flex gap-8 font-mono text-sm">
          <a 
            href="https://github.com/CarlosGitUser" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Carlos - Frontend dev
          </a>
          <a 
            href="https://github.com/Einar115" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Einar - Backend dev
          </a>
        </div>
      </footer>
      
    </div>
  )
}