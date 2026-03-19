import { getRankStyles } from "../helpers/getRankStyles";

interface Props {
  rank: number;
  username: string;
  score: number;
  time: string;
  date: string;
}

export const ScoreRow = ({rank, username, score, time, date} : Props) => {
  const styles = getRankStyles(rank);
  return (
      <div className={`flex items-center justify-between px-6 py-3
      border-2 rounded-xl backdrop-blur-md transition-all duration-300 group ${styles.wrapper}`}>
        <p className={`w-12 text-2xl font-black ${styles.rankText}`}>{rank}{styles.suffix}</p>
        <p className="flex-1 text-white font-bold tracking-wide">{username}</p>
        <div className="flex gap-8 items-center">
          <p className="font-bold text-2xl text-white">{score} pts</p>
          <p className="font-mono text-slate-300/70 text-sm">{time}</p>
          <p className="font-mono text-[12px] capitalize text-slate-400">{date}</p>
        </div>
      </div>
  )
}
