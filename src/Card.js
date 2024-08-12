import React from "react"
import "./styles/Card.css"

export default function Card(props){
    
    const [showAnswer, setShowAnswer] = React.useState(false)
    
    function changeShowAnswer(){
        setShowAnswer(prevShowAnswer => !prevShowAnswer)
    }

    return (
        <div className="card--container">
            <h4 className="card--title">{props.title}</h4>
            <p className="card--riddle">{props.riddle}</p>
            {showAnswer && <p className="card--answer">Answer: {props.answer}</p>}
            <button className="card--button" onClick={changeShowAnswer}>{showAnswer ? "Hide" : "Show"} Answer</button>
        </div>
    )
}