import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth"
import { ScoreRow } from "./ScoreRow"
import { Button } from "../../../shared/components/Button";
import { Lock } from "lucide-react";

export const UserScore = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-blue-900/10 border-2 border-dashed border-cyan-500/30 rounded-3xl backdrop-blur-sm max-w-2xl mx-auto my-8 transition-all hover:border-cyan-500/50 group">
        <div className="bg-cyan-500/10 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
          <Lock className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
        </div>
        
        <h3 className="text-3xl font-black italic text-white mb-3 tracking-tight">
          SQUAD DATA ENCRYPTED
        </h3>
        
        <p className="text-cyan-100/70 text-lg italic mb-8 text-center max-w-md leading-relaxed">
          Log in to synchronize your combat records and compete in the global ranks.
        </p>

        <div className="w-full max-w-xs">
          <Button 
            text="Access Terminal" 
            onClick={() => navigate('/auth', { state: { view: 'login' } })}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto italic">
      {/* Mock data */}
      <ScoreRow rank={1} username="PlayerOne" score={500} time="30s" date="16 Mar 2026" />
      <ScoreRow rank={2} username="Death_cb" score={400} time="40s" date="18 Mar 2026" />
      <ScoreRow rank={3} username="Silent" score={350} time="45s" date="18 Mar 2026" />
      <ScoreRow rank={4} username="Noob" score={120} time="60s" date="19 Mar 2026" />
      <ScoreRow rank={5} username="Guest" score={90} time="75s" date="19 Mar 2026" />
    </div>
  )
}
