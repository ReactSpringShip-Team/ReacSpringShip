import { useState } from "react"
import { GlobalScore } from "../features/leaderboard/components/GlobalScore";
import { UserScore } from "../features/leaderboard/components/UserScore";
import { BackButton } from "../shared/components/BackButton";
import { useLocation } from "react-router-dom";

type tab = 'global' | 'user';

export const LeaderboardPage = () => {

  const location = useLocation();
  const initialView = location.state?.activeTab || 'global';
  const [activeTab, setActiveTab] = useState<tab>(initialView);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#051124] font-sans text-white select-none">
      
      <BackButton/>

      {/* Main container with Neon effect*/}
      <div className= "w-full max-w-2xl p-8 rounded-2xl border-2 border-cyan-500/50 bg-blue-900/20 backdrop-blur-md shadow-[0_0_20px_#22d3ee] font-sans">
        <h1 className="text-5xl font-bold text-center text-white italic tracking-tighter uppercase drop-shadow-[0_0_10px_#fff] mb-8">
          top score
        </h1>

        <div className="flex justify-center gap-4 mb-6">  
            <button 
            onClick={() => setActiveTab('user')} 
            className={`px-6 py-1 rounded-sm border-b-2 transition-all italic font-bold uppercase tracking-wider cursor-pointer
              ${activeTab === 'user' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            My scores
          </button>
          <button
          className={`px-6 py-1 rounded-sm border-b-2 italic uppercase transition-all tracking-wider font-bold cursor-pointer
            ${activeTab === 'global' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}
            `}
          onClick={ ()=> setActiveTab('global')}>Global Scores</button>
        
        </div>

        <div className="w-full">
          {/* Componentes */}
          {activeTab === 'global' ? <GlobalScore/> : <UserScore/> }
          
        </div>
      </div>
    </div>
  )
}
