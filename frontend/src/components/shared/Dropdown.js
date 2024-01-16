import { useState } from 'react';

export default function Dropdown({ options }) {
  const [value, setValue] = useState('');
  console.log(value);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="books">My Books:</label>
      <select id="books" value={value} onChange={handleChange}>
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
