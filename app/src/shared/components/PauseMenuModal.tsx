import { Button } from "./Button"

interface Props {
    onExit : () => void;
    onContinue: () => void;
}

export const PauseMenuModal = ({onExit, onContinue} : Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm select-none">
        
        <div className="flex flex-col items-center p-12 bg-[#051124] border-2 border-cyan-500/50 rounded-2xl gap-8 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            
            <h1 className="text-5xl text-white font-bold italic tracking-widest drop-shadow-[0_0_10px_#fff]">
              PAUSE
            </h1>

            <div className="flex flex-col gap-4 w-full">
              <Button text="Continue" color="blue" onClick={onContinue} />
              <Button text="Exit" color="red" onClick={onExit} />
            </div>

        </div>
    </div>
  )
}