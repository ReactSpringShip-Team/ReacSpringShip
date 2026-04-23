import { Volume2, VolumeX, Music, Zap } from 'lucide-react'; 
import { useMusic } from '../context/MusicContext';

export const AudioSettings = () => {
  const { masterVolume, musicVolume, effectsVolume, setVolume } = useMusic();

  const VolumeSlider = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon,
    colorClass = "text-cyan-400"
  }: { 
    label: string, 
    value: number, 
    onChange: (v: number) => void,
    icon: any,
    colorClass?: string
  }) => (
    <div className="w-full flex flex-col gap-4 p-5 border border-cyan-500/20 rounded-xl bg-[#051124]/30 backdrop-blur-sm">
      <div className="flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <Icon size={20} className={colorClass} />
          <label className="text-lg italic font-bold uppercase tracking-wider text-slate-200">
            {label}
          </label>
        </div>
        <span className="font-mono text-lg text-cyan-400">{value}%</span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => onChange(value > 0 ? 0 : 80)} 
          className={`${colorClass} hover:text-white transition-all cursor-pointer`}
        >
          {value === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))} 
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]" 
        />
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <h4 className="text-3xl text-center italic font-bold uppercase font-sans text-cyan-400 drop-shadow-[0_0_8px_#22d3ee] mb-4">
        Audio Configuration
      </h4>

      <div className="w-full flex flex-col gap-4 max-w-md">
        <VolumeSlider 
          label="Master Volume" 
          value={masterVolume} 
          onChange={(v) => setVolume('masterVolume', v)} 
          icon={Volume2}
        />
        
        <VolumeSlider 
          label="Music" 
          value={musicVolume} 
          onChange={(v) => setVolume('musicVolume', v)} 
          icon={Music}
          colorClass="text-pink-400"
        />

        <VolumeSlider 
          label="Sound Effects" 
          value={effectsVolume} 
          onChange={(v) => setVolume('effectsVolume', v)} 
          icon={Zap}
          colorClass="text-yellow-400"
        />
      </div>
      
      <p className="text-xs text-slate-500 italic mt-2">
        * Total music volume: {Math.round((masterVolume * musicVolume) / 100)}%
      </p>
    </div>
  );
};
