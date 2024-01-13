// import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

export default function SwapRequest() {
  const { user, bookId } = useParams();

  const [data, setData] = useFetchData(
    `http://localhost:3001/swap/${user}/${bookId}`
  );

  return (
    <div>
      <h1>Swap Request Pages</h1>
      <h2>Requested Book</h2>
      <ul>
        <li>Owner: {user}</li>
        {data ? <li>Book Title: {data.title}</li> : null}
      </ul>

      <form method='POST'>
        {/* List of books than can be offered to swap */}
        {/* Field to enter any cash amount that could be offerred in addition the the above. */}
        {/* Allow radio for buy only option */}
        {/* TODO
            1. Fetch login user data
            2. Show user's  list of books in a dropdown list
            3. Send a post request to send the request to the owner of the book. 
            Authentication is required to allow adding the swap request to the book owner's data.
            Only up to three requests can be made by one user to another user at a time.
            Previous requests must be resolved before further requests could be made.
            4. Update dashboard to show a section of requests made.
            This is to be expanded further to show new, pending, rejected, and completed requests  */}

        <button type='submit'>Send Request</button>
      </form>
    </div>
  );
}
