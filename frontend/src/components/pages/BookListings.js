import { useState, useEffect } from "react";

export default function BookListings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/listings', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const data = await response.json(response);
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
                                listings.map((book, index) => <li key={index}>{book.title}</li>)
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    );
}