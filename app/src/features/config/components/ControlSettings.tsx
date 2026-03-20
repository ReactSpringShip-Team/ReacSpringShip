export const ControlSettings = () => {
  const keyStyle = "w-14 h-14 flex items-center justify-center rounded-xl border-2 border-cyan-500/40 bg-cyan-900/40 text-cyan-100 font-bold font-mono text-2xl shadow-[0_0_10px_rgba(34,211,238,0.1)] backdrop-blur-sm";

  return (
    <div className="w-full flex flex-col items-center">
      <h4 className="text-3xl text-center italic font-bold uppercase font-sans text-cyan-400 drop-shadow-[0_0_8px_#22d3ee] mb-10">
        Keyboard
      </h4>

      {/* MASTER GRID */}
      <div className="grid grid-cols-[max-content_auto] gap-x-12 gap-y-8 items-center justify-center">
        
        {/* ROW 1: MOVE */}
        <p className="text-xl italic font-bold uppercase tracking-wider text-cyan-400 drop-shadow-[0_0_8px_#22d3ee] text-right">
          Move
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className={`col-start-2 ${keyStyle}`}>W</div>
          <div className={`col-end-2 ${keyStyle}`}>A</div>
          <div className={keyStyle}>S</div>
          <div className={keyStyle}>D</div>
        </div>

        {/* ROW 2: SHOOT */}
        <p className="text-xl italic font-bold uppercase tracking-wider text-cyan-400 drop-shadow-[0_0_8px_#22d3ee] text-right">
          Shoot
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className={`col-span-3 w-full h-14 flex items-center justify-center rounded-xl border-2 border-cyan-500/40 bg-cyan-900/40 text-cyan-100 font-bold font-mono text-2xl shadow-[0_0_10px_rgba(34,211,238,0.1)] backdrop-blur-sm`}>
            Space
          </div>
        </div>
      </div>
    </div>
  );
}