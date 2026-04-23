import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth"
import { ScoreRow } from "./ScoreRow"
import { Button } from "../../../shared/components/Button";
import { Lock } from "lucide-react";
import { leaderboardService } from "../services/leadearboard.service";
import type { UserScoreResponse } from "../types/leaderboard.types";
import { formatDate, formatTime } from "../../../shared/utils/format";
import { LoadingScreen } from "../../../shared/components/LoadingScreen";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";

export const UserScore = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scores, setScores] = useState<UserScoreResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      leaderboardService.getMyScores()
        .then(data => {
          setScores(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching user scores:", err);
          setError("Failed to load your scores");
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

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

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto italic">
      {scores.map((score, index) => (
        <ScoreRow 
          key={index}
          rank={index + 1}
          username="YOU" // Or get from auth if available
          score={score.score}
          time={formatTime(score.timeSecs)}
          date={formatDate(score.playedAt)}
        />
      ))}
      {scores.length === 0 && (
        <p className="text-center text-gray-400 py-8">You haven't recorded any scores yet.</p>
      )}
    </div>
  )
}
