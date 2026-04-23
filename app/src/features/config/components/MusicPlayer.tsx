import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const MusicPlayer = () => {
  const { currentSong, isPlaying, play, pause, next, previous } = useMusic();

  return (
    <div className="fixed bottom-8 left-8 flex items-center gap-4 bg-[#051124]/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)] select-none animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="bg-cyan-500/20 p-3 rounded-xl">
        <Music className={`w-6 h-6 text-cyan-400 ${isPlaying ? 'animate-pulse' : ''}`} />
      </div>

      <div className="flex flex-col min-w-[120px]">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-500/70">Now Playing</span>
        <span className="text-sm font-bold text-white truncate max-w-[150px]">{currentSong.title}</span>
        <span className="text-[10px] text-slate-400 italic">{currentSong.artist}</span>
      </div>

      <div className="flex items-center gap-2 ml-2">
        <button 
          onClick={previous}
          className="p-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <SkipBack size={20} />
        </button>

        <button 
          onClick={isPlaying ? pause : play}
          className="p-3 bg-cyan-500/20 rounded-full text-cyan-400 hover:bg-cyan-500/40 transition-all cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>

        <button 
          onClick={next}
          className="p-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};
