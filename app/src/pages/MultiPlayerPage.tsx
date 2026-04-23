import { useState } from "react";

import type { viewTab } from "../features/multi-player/types/view.type";
import { Lobby, MultiplayerCanvas, MultiplayerMenu } from "../features/multi-player";
import { BackButton } from "../shared";

export const MultiPlayerPage = () => {

  const [view, setView] = useState<viewTab>('menu');

  const conditionalRender = () => {
    if(view === 'playing'){
      return <MultiplayerCanvas />
    }else
    if(view === 'menu'){
      return <>
              <BackButton/>
              <MultiplayerMenu onJoinRoom={setView}/>
            </>
    }else if(view === 'lobby'){
      return <>
              <BackButton/>
              <Lobby />
             </>
    }
  }

  return (
    <div className={`min-h-screen bg-[#051124] flex flex-col text-white relative ${
          view === 'playing' ? 'pt-4' : 'p-8 justify-center'
        }`}>
          { conditionalRender() }
        </div>
  )
}
