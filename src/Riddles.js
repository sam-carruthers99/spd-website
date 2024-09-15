import "./styles/Riddles.css";
import Card from "./Card.js";
import { useEffect, useState } from 'react';
import riddlesData from './riddles.json';

export default function Riddles() {
    
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    // JSON File with all riddle information
    useEffect(() => {
        const riddleCards = riddlesData.riddles.map((riddle, index) => (
            <Card key={index} title={riddle.title} riddle={riddle.riddle} answer={riddle.answer} />
        ));
        setCards(riddleCards);
    }, []);

    // Get current cards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="riddles--container">
            <h3>Riddles and Brainteasers</h3>
            {currentCards}
            <Pagination 
                cardsPerPage={cardsPerPage} 
                totalCards={cards.length} 
                paginate={paginate} 
                currentPage={currentPage}
            />
        </div>
    );
}

function Pagination({ cardsPerPage, totalCards, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <a onClick={() => paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
