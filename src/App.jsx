import { Route,Routes } from "react-router-dom"
import CreateRoom from "./pages/CreateRoom"
import Home from "./pages/Home"
import JoinRoom from "./pages/JoinRoom"
import Room from "./pages/Room"

function App() {

  return (
   <Routes>
    <Route path ="/" element = { <Home/> } />
    <Route path ="/create" element = { <CreateRoom/> } />
    <Route path ="/join" element = { <JoinRoom/> } />
    <Route path ="/room/:code" element = { <Room/> } />
   </Routes>

  )
}

export default App
