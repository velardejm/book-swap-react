import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import Transactions from '../Transactions/Transactions';
import Header from '../Header/Header';

export default function Dashboard() {
  const [books, setBooks] = useFetchData('http://localhost:3001/books');
  const [userTransactions, setUserTransactions] = useFetchData(
    'http://localhost:3001/users/transactions'
  );

  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
      <BookList books={books} setBooks={setBooks} />
      <Transactions
        userTransactions={userTransactions}
        setUserTransactions={setUserTransactions}
        books={books}
        setBooks={setBooks}
      />
    </div>
  );
}
