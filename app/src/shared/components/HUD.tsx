import { PlayerLives } from './PlayerLives'

interface Props {
    username: string;
    lives: number;
    time: number;
    score: number;
}



export const HUD = ( {username, lives, time, score} : Props) => {
  return (
    <div className='w-full flex justify-between pl-4 pr-4 pb-4 items-center'>
        <p className='text-3xl uppercase italic font-black'>{username}</p>
        <PlayerLives lives={lives}/>
        <div>
            <p className='text-2xl'>Score: {score} pts</p>
            <p className='text-2xl'>Time: {time} s</p>
        </div>

    </div>
  )
}
