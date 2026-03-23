import { Button } from "./Button"

interface Props {
    onExit: () => void;
}

export const GameOverModal = ( {onExit} : Props) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm select-none">
        <div className="flex flex-col items-center p-12 bg-[#051124] border-2 border-cyan-500/50 rounded-2xl gap-8 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <h1 className="text-5xl text-white font-bold italic tracking-widest drop-shadow-[0_0_10px_#fff]">
                Game Over
            </h1>

            <div className="flex flex-col w-full gap-4">
                <Button text="Play again" color="green" />
                <Button text="Exit" color="red" onClick={onExit}/>
            </div>

        </div>
    </div>
  )
}
