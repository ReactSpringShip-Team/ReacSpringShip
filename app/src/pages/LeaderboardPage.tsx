import { useState } from "react"

type tab = 'global' | 'user';


export const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState<tab>('global');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-800">
      <div className="">
        <h1 className="text-3xl text-center text-cyan-600">Leaderboard</h1>

        <div>
          <button 
          onClick={ () => setActiveTab('user')} 
          className={ activeTab === 'user' ? 'bg-blue-800' : 'bg-blue-300'}>My scores</button>
          <button 
          onClick={() => setActiveTab('global')} 
          className={ activeTab === 'global' ? 'bg-blue-800' : 'bg-blue-300'}>Gobal scores</button>
        </div>

        <div>
          {/* Componentes */}
          {activeTab === 'global' ? <p>Global</p>: <p>User</p> }
          
        </div>
      </div>
    </div>
  )
}
