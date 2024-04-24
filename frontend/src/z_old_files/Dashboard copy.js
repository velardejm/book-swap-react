import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import React from 'react';
import BookList from './BookList';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useFetchData('http://localhost:3001/users/dashboard');
  // console.log(data);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!data) {
    return null;
  }

  const { name, booksAvailable, incomingRequests } = data;
  return (
    <div className="bg-blue-200 flex flex-col items-center mb-5 pb-5">
      <h1 className="font-bold text-2xl">Welcome {name}</h1>
      <p>
        You have <Link to="/users/transactions">{incomingRequests.length}</Link>{' '}
        swap requests.
      </p>
      <BookList></BookList>
    </div>
  );
}
