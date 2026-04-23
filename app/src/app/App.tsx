import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { MusicProvider } from "../features/config/context/MusicContext"

export const App = () => {
  return (
    <BrowserRouter>
      <MusicProvider>
        <Router/>
      </MusicProvider>
    </BrowserRouter>
  )
}
