import { useEffect } from 'react';

import Header from '../shared/Header';
import Hero from '../shared/Hero';

export default function Home() {
  useEffect(() => {
    fetch('http://localhost:3001/');
  }, []);


  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
