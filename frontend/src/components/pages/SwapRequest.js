// import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuthorizedFetch from '../../hooks/useAuthorizedFetch';

export default function SwapRequest() {
  const { user, bookId } = useParams();

  const [fetchResponse] = useAuthorizedFetch(
    `http://localhost:3001/swap/${user}/${bookId}`
  );

  const book = fetchResponse.data;

  return (
    <div>
      <h1>Swap Request Page</h1>
      <h2>Requested Book</h2>
      <ul>
        <li>Owner: {user}</li>
        {book ? <li>Book Title: {book.title}</li> : null}
      </ul>
    </div>
  );
}
