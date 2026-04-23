import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full animate-in fade-in duration-500">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
      </div>
      <p className="mt-4 text-cyan-100/60 font-bold tracking-widest animate-pulse uppercase text-sm">
        Syncing Data...
      </p>
    </div>
  );
};
