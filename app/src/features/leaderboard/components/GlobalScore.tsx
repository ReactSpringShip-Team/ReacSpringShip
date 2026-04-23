import { useEffect, useState } from "react";
import { ScoreRow } from "./ScoreRow"
import { leaderboardService } from "../services/leadearboard.service";
import type { ScoreResponse } from "../types/leaderboard.types";
import { formatDate, formatTime } from "../../../shared/utils/format";
import { LoadingScreen } from "../../../shared/components/LoadingScreen";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";

export const GlobalScore = () => {
  const [scores, setScores] = useState<ScoreResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    leaderboardService.getAllScores()
      .then(data => {
        setScores(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching global scores:", err);
        setError("Failed to load global scores");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto italic">
      {scores.map((score, index) => (
        <ScoreRow 
          key={index}
          rank={index + 1}
          username={score.username}
          score={score.bestScore}
          time={formatTime(score.bestTime)}
          date="" // The global leaderboard doesn't return a specific date for the 'best' score record
        />
      ))}
      {scores.length === 0 && (
        <p className="text-center text-gray-400 py-8">No scores recorded yet.</p>
      )}
    </div>
  )
}
