import { useState } from "react"
import { GlobalScore } from "../features/leaderboard/components/GlobalScore";
import { UserScore } from "../features/leaderboard/components/UserScore";

type tab = 'global' | 'user'


export const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState<tab>('global');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#051124] font-sans text-white">
      {/* Main container with Neon effect*/}
      <div className= "w-full max-w-2xl p-8 rounded-2xl border border-cyan-500/50 bg-blue-900/20 backdrop-blur-md shadow-[0_0_20px_rgba(8,145,178,0.3)]">
        <h1 className="text-5xl font-black text-center text-white italic tracking-tighter uppercase drop-shadow-[0_0_10px_#fff] mb-8">
          top score
        </h1>

        <div className="flex justify-center gap-4 mb-6">  
            <button 
            onClick={() => setActiveTab('user')} 
            className={`px-6 py-1 rounded-sm border-b-2 transition-all italic font-bold uppercase tracking-wider
              ${activeTab === 'user' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            My scores
          </button>
          <button
          className={`px-6 py-1 rounded-sm border-b-2 italic uppercase transition-all tracking-wider font-bold
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
