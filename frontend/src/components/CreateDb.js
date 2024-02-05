import { useEffect } from 'react';

export default function CreateDb() {
  useEffect(() => {
    fetch('http://localhost:3001/pg-create', {
      method: 'GET',
    });
  });

  return null;
}
