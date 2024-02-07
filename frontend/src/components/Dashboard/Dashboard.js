import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import BookList from './BookList';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // const [data, setData] = useFetchData('http://localhost:3001/users/dashboard');
  // console.log(data);

  // if (!data) {
  //   return null;
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      <BookList />
    </div>
  );
}
