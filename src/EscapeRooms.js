import "./styles/EscapeRooms.css"

export default function EscapeRooms(){

    function handleClick() {
        console.log("clicked")
        // render next section of the page. For this, have pretty much everything on /EscapeRooms. Not navigating. Then rendering new puzzles
    }

    return (
        <div>
            <div className="escapeRoom-title">
                <h3>Virtual Escape Room</h3>
                <p >This page contains the first puzzle in a virtual escape room. Can you escape? </p>
            </div>
            <button className="hidden" onClick={handleClick}>Next puzzle</button>
        </div>
    )
}