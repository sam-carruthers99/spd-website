import "./styles/Main.css"
import React from "react"
import { useNavigate } from 'react-router-dom';

export default function Main(props) {
    
    const navigate = useNavigate();

    return (
        <div className="main">   
                <div className="box--container">
                    <div className="box"  onClick={() => navigate(`/Puzzles`)}>
                        <p>Puzzles</p>
                        <img src={require("./images/puzzlepiece.png")} alt="puzzle piece icon"/>
                        <div className="hidden--box" >Original puzzles and puzzle games</div>
                    </div>
                    <div className="empty--box" >Original puzzles and puzzle games</div>
                </div>
                <div className="box--container">
                    <div className="box"  onClick={() => navigate(`/Riddles`)}>
                        <p>Riddles</p>
                        <img src={require("./images/questionmark.png")} alt="puzzle piece icon"/>
                        <div className="hidden--box" >Popular classic riddles and brain teasers</div>
                    </div>
                    <div className="empty--box" >Popular classic riddles and brain teasers</div>
                </div>
                <div className="box--container">
                    <div className="box"  onClick={() => navigate(`/EscapeRooms`)}>
                        <p>Escape Rooms</p>
                        <img src={require("./images/padlock.png")} alt="puzzle piece icon"/>
                        <div className="hidden--box" >Custom escape room games and similar games</div>
                    </div>
                    <div className="empty--box" >Custom escape room games and similar games</div>
                </div>
                <div className="box--container">
                    <div className="box" onClick={() => navigate(`/Ciphers`)}>
                        <p>Ciphers</p>
                        <img src={require("./images/cipher.png")} alt="puzzle piece icon"/>
                        <div className="hidden--box" >A dive into historical ciphers and how to break them</div>   
                    </div>
                    <div className="empty--box" >A dive into historical ciphers and how to break them</div>     
                </div>
        </div>
    )
}