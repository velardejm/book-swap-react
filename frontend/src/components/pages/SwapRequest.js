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
    </div>
  );
}
