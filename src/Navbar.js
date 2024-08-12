import "./styles/Navbar.css";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="container">
      <div className="navbar-left">
        <h2 className="title">SolvePuzzlesDaily</h2>
        <img src={require("./images/lock.png")} className="image" alt="gloom" />
      </div>
      <div className={`list-container ${isOpen ? "open" : ""}`}>
        <ul className="list">
          <li className="nav--li" onClick={() => handleClose(`/`)}>Home</li>
          <li className="nav--li" onClick={() => handleClose(`/Puzzles`)}>Puzzles</li>
          <li className="nav--li" onClick={() => handleClose(`/Riddles`)}>Riddles</li>
          <li className="nav--li" onClick={() => handleClose(`/EscapeRooms`)}>Escape Rooms</li>
          <li className="nav--li" onClick={() => handleClose(`/Ciphers`)}>Ciphers</li>
        </ul>
      </div>
      <div className="menu-icon" onClick={handleToggle}>
        ☰
      </div>
    </nav>
  );
}
