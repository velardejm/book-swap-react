import { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:3001/');
      const jsonResponse = await res.json();
      console.log(jsonResponse);
    };

    getData();

    // fetch('http://localhost:3001/')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
