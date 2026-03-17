import { ScoreRow } from "./ScoreRow"

export const UserScore = () => {
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
