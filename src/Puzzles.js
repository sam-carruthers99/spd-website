import "./styles/Puzzles.css"
import React, { useState } from 'react';

export default function Puzzles(){
    
    const wrongResponse = ["Incorrect", "Wrong", "Nope", "Try Again", "That didn't work", "False"]
    const [userAnswer, setUserAnswer] = useState("")
    const [isCorrect, setIsCorrect] = useState(false)
    const [wrongText, setWrongText] = useState("Incorrect");
    const [tried, setTried] = useState(false)
    const answer = "PHONE" // database has answer and image of puzzle
    
    
    function checkAnswer(){
        if(userAnswer.toUpperCase() == answer){
            setIsCorrect(true)
        }
        else{
            setIsCorrect(false)
            var newText = wrongResponse[Math.floor(Math.random()*wrongResponse.length)];
            while(newText == wrongText)
                var newText = wrongResponse[Math.floor(Math.random()*wrongResponse.length)];
            setWrongText(newText)
        }
        setUserAnswer("")
        setTried(true)
    }
    
    return (
        // Just have a weekly puzzle. It will cycle through original ones that you have made. So you can repeat stuff and continue experimenting with creating original ones. 
        <div className="puzzle--container">
            <h3 className="puzzles-title">Puzzle of the Week</h3>
            <div className="puzzle--content">
                {/* <p>Puzzle Name</p> */}
                <img className="puzzle--image" src={require("./images/Enigmarch_1.png")}></img>
            </div>
            <div className="input--container">
                <div className="input--label">Enter your answer:</div>
                    <input className="input--box"
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                <button className="input--button" onClick={checkAnswer}>Check Answer</button>
                
            </div>
            {isCorrect && <p className="correct--text">Correct!</p>}
            {tried && !isCorrect && <p className="incorrect--text">{wrongText}</p>}
        </div>
    )
}