import { Button } from "../../../shared/components/Button"
import { Input } from "../../../shared/components/Input"
import type { viewTab } from "../types/view.type";

interface Props {
    onJoinRoom: (view : viewTab) => void;
    // onCreateLobby: () => void;
}

export const MultiplayerMenu = ( {onJoinRoom} : Props) => {
  return (
    <div className="w-ful flex flex-col lg:flex-row justify-around ">
        <div className="">
            <h1 className="text-5xl text-bold tracking-wider italic mb-6 text-center">Create Lobby</h1>
            <div className="border-2 rounded-2xl border-cyan-400 shadow-[0_0_15px_#fff] p-6  grid grid-cols-[100px_1fr] backdrop-blur-2xl bg-linear-to-b from-cyan-950/40 to-black/60">
            
                <label htmlFor="" className="pr-4 text-xl tracking-wider pt-2 uppercase">Name:</label>
                <Input color="purple" placeHolder="My lobby" />
            
                <div className="col-span-2">
                    <Button text="Create" color="green"/>
                </div>
            </div>
        </div>

        <div className="">
            <h1 className="text-5xl text-bold tracking-wider italic mb-6 text-center">Join Lobby</h1>
            <div className="border-2 rounded-2xl border-cyan-400 shadow-[0_0_15px_#fff] p-6 grid grid-cols-[100px_1fr] backdrop-blur-2xl bg-linear-to-b from-cyan-950/40 to-black/60">
            
                <label htmlFor="" className="pr-4 text-xl tracking-wider pt-2 uppercase">Code:</label>
                <Input color="purple" placeHolder="xyz-123" />
            
                <div className="col-span-2">
                    <Button text="Join" color="yellow" onClick={ () => onJoinRoom('lobby')}/>
                </div>
            </div>
        </div>

    </div>
  )
}
