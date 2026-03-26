export const Lobby = () => {
  return (
    // MAIN WRAPPER: Centers everything and limits the maximum width
    <div className="w-full max-w-6xl mx-auto p-8 text-white font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* === LEFT COLUMN: PLAYER LIST === */}
       
        <div className="flex flex-col h-80">
          <h2 className="text-4xl text-center mb-6 font-bold italic tracking-wider">Player List</h2>
          
          <div className="flex-1 border-2 border-slate-500 rounded-3xl p-6 flex flex-col gap-4 overflow-y-auto">
            <p className="text-lg">Player name</p>
            <p className="text-lg">Player name</p>
            <p className="text-lg">Player name</p>
          </div>
        </div>

        {/* === RIGHT COLUMN: ROOM CHAT === */}
      
        <div className="lg:col-span-2 flex flex-col h-120">
          <h2 className="text-4xl text-center mb-6 font-bold italic tracking-wider">Room Chat</h2>
          
          {/* Chat Container */}
          <div className="flex flex-col border-2 border-slate-500 rounded-3xl overflow-hidden mb-6 flex-1">
            
            {/* Messages Area*/}
            <div className="flex-1 p-6 bg-[#0f172a]/50 overflow-y-auto">
               {/* Messages will render here */}
            </div>
          
            <div className="flex border-t-2 border-slate-500 h-16">
              <input 
                type="text" 
                placeholder="Send something to the chat" 
                className="flex-1 bg-transparent px-6 outline-none text-lg"
              />
              <button className="border-l-2 border-slate-500 px-8 hover:bg-slate-800 transition-colors text-lg cursor-pointer">
                Send
              </button>
            </div>
          </div>

          {/* === START GAME BUTTON === */}
          <button className="self-end px-12 py-3 border-2 border-cyan-500 rounded-2xl text-cyan-400 hover:bg-cyan-900/30 transition-colors font-bold text-xl cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            Start Game
          </button>

        </div>
      </div>
    </div>
  )
}