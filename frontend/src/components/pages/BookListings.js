import { useState, useEffect } from "react";

export default function BookListings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/listings', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data.response);
            setListings(data.response);
            console.log(listings);
        }



        fetchData();
    }, []);

    return (
        <div>
            {listings.map(({user, listings}, index) => {
                return (
                    <div key={index}>
                        <h1>{user}</h1>
                        <ul className="mx-3">
                            {
                                listings.map((book, index) => {
                                    return (
                                        <li key={index}>
                                            <p>{book.title} <a className="text-blue-500" href={`/swap/${user}/${book.bookId}`}>Swap</a></p> 
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    );
}