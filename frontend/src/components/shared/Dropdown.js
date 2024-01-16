// import { useState } from 'react';

export default function Dropdown({ options, setterFunction }) {
  // const [value, setValue] = useState('');

  const handleChange = (e) => {
    // setValue(e.target.value);
    setterFunction(e.target.value);
  };

  return (
    <div>
      <label htmlFor="books">My Books:</label>
      <select id="books" onChange={handleChange}>
        <option>Select a book...</option>
        {options.map((book, index) => {
          return (
            <option key={index} value={book.title}>
              {book.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
