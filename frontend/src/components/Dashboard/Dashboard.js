import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import Transactions from '../Transactions/Transactions';
import Header from '../shared/Header';

export default function Dashboard() {
  // const [data, setData] = useFetchData('http://localhost:3001/users/dashboard');
  // console.log(data);

  // if (!data) {
  //   return null;
  // }

  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
      <BookList />
      <Transactions />
    </div>
  );
}
