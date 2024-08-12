import './styles/App.css';
import NavBar from "./Navbar.js"
import Main from "./Main.js"
import Puzzles from "./Puzzles.js"
import Riddles from "./Riddles.js"
import EscapeRooms from "./EscapeRooms.js"
import Ciphers from "./Ciphers.js"
// import Other from "./Other.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="app--container">
        <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/puzzles" element={<Puzzles/>} />
                    <Route path="/riddles" element={<Riddles/>} />
                    <Route path="/EscapeRooms" element={<EscapeRooms/>} />
                    <Route path="/Ciphers" element={<Ciphers/>} />
                    {/* <Route path="/Other" element={<Other/>} /> */}
                </Routes>
        </Router>
    </div>
  )
}

export default App;
