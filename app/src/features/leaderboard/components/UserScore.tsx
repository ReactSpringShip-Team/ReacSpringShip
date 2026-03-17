
export const UserScore = () => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto italic">
      <div className="flex items-center justify-between px-6 py-3
      bg-linear-to-r from-yellow-600/20 to-transparent
      border border-yellow-500/20 rounded-xl backdrop-blur-md
      shadow-[0_0_15px_rgba(234,179,8,0.2)]
      hover:from-yellow-600/30 transition-all duration-300 group">
        <p className="w-12 text-2xl font-black text-yellow-400 drop-shadow-[0_0_10px_#ca8a04]">1st</p>
        <p className="flex-1 text-white font-bold tracking-wide">Username</p>
        <div className="flex gap-8 items-center">
          <p className="text-2xl font-black text-whide">500 pts</p>
          <p className="text-sm text-yellow-200/70 font-mono">30s</p>
          <p className="text-[12px] text-slate-400 font-mono capitalize">17 mar 2026</p>
        </div>
      </div>
      <div className="flex items-center justify-between border border-slate-600/20 px-6 py-3
      rounded-xl shadow-[0_0_15px_rgba(148,163,184,0.2)] bg-linear-to-r from-slate-300/50 to-transparent
      backdrop-blur-md hover:from-slate-400 transition-all duration-300 group">
        <p className="text-2xl w-12 font-bold text-slate-300/60 drop-shadow-[0_0_10px_#8c8c8c]">2nd</p>
        <p className="flex-1 font-bold tracking-wide text-white">Username</p>
        <div className="flex gap-8 items-center">
          <p className="font-bold text-2xl">400 pts</p>
          <p className="font-mono text-slate-400/70 text-sm">40s</p>
          <p className="font-mono text-[12px] capitalize text-slate-400">18 mar 2026</p>
        </div>
      </div>
    </div>
  )
}
