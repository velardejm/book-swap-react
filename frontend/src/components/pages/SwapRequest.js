// import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

export default function SwapRequest() {
  const { user, bookId } = useParams();

  // const [fetchResponse] = useAuthorizedFetch(
  //   `http://localhost:3001/swap/${user}/${bookId}`
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `http://localhost:3001/swap/${user}/${bookId}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const dataObject = await response.json();
  //       setBook(dataObject.data);
  //     } else {
  //       localStorage.removeItem('token');
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [data, setData] = useFetchData(
    `http://localhost:3001/swap/${user}/${bookId}`
  );

  console.log(data);

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
