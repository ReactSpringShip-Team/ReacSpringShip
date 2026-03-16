import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { AuthPage } from "../pages/AuthPage"
import { LeaderboardPage } from "../pages/LeaderboardPage"
import { SettingsPage } from "../pages/SettingsPage"
import { SinglePlayerPage } from "../pages/SinglePlayerPage"
import { MultiPlayerPage } from "../pages/MultiPlayerPage"
import { Sandbox } from "../sandbox/Sandbox"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage}/>
      <Route path="/home" Component={HomePage}/>
      <Route path="/auth" Component={AuthPage}/>
      <Route path="/leaderboard" Component={LeaderboardPage}/>
      <Route path="/settings" Component={SettingsPage}/>
      <Route path="/single-player" Component={SinglePlayerPage}/>
      <Route path="/multi-player" Component={MultiPlayerPage}/>
      <Route path="*" element={<p>404 - Element not found</p>}/>  {/*<-- In the future I need to create a specific page for the "*"" path */}
      <Route path="/sandbox" Component={Sandbox}/>
     
    </Routes>
  )
}
