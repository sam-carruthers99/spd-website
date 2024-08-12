import "./styles/Riddles.css";
import Card from "./Card.js";
import { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

export default function Riddles() {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    const key = process.env.REACT_APP_ACCESS_KEY; // react requires REACT_APP_ prefix on an env variable to load it properly
    const secret_key = process.env.REACT_APP_SECRET_ACCESS_KEY;

    const client = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-2',
        accessKeyId: key,
        secretAccessKey: secret_key
    });

    const params = {
        TableName: 'riddles'
    };


    // TO DO
    // Create a JSON file that has all the data for riddles that you can add to
    // Uploads the riddles to the database in AWS, and can add stuff to it then run the script once each time 

    useEffect(() => {
        const scanTable = async () => {
            try {
                let items = [];
                let data;
                do {
                    data = await client.scan(params).promise();
                    items = items.concat(data.Items);
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                } while (typeof data.LastEvaluatedKey !== "undefined");

                const newCards = items.map((item, index) => {
                    const { answer, title, riddle } = item;
                    return <Card key={index} title={title} riddle={riddle} answer={answer} />;
                });
                
                setCards(newCards);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        scanTable();
    }, []); // Empty dependency array ensures this runs only once

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
