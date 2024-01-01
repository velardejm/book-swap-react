import { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Private from './Private';

export default function Home() {

  // Test express get route
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch('http://localhost:3001/');
  //     const responseData = await res.json();
  //     console.log(responseData);
  //   };

  //   getData();
  // });

  return (
    <>
      <Header />
      <Hero />
      <Private>
        <h1>Test</h1>
      </Private>
    </>
  );
}
