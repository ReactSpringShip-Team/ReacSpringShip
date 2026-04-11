import { AudioSettings, ControlSettings } from "../features/config";
import { BackButton } from "../shared";


export const SettingsPage = () => {

  const cardStyle = "p-10 border-2 border-cyan-500/20 rounded-3xl bg-cyan-950/10 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col";
  
    return (
      <div className="relative min-h-screen bg-[#051124] text-white p-12 font-sans select-none animate-fade-in">
        
       <BackButton/>
  
        {/* Main Title */}
        <h1 className="text-7xl text-center font-black uppercase italic mb-16 drop-shadow-[0_0_20px_#fff]">
          Settings
        </h1>
  
        {/* DASHBOARD GRID LAYER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start max-w-7xl mx-auto">
          <div className={cardStyle}>
            <ControlSettings />
          </div>
          <div className={cardStyle}>
            <AudioSettings />
          </div>
        </div>
        
      </div>
    );
}
