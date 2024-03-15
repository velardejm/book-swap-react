export default function Dropdown({ options, setterFunction }) {
  const handleChange = (e) => {
    setterFunction(options[e.target.value]);
  };

  return (
    <div>
      <label htmlFor="books">My Books:</label>
      <select id="books" onChange={handleChange}>
        <option>Select a book...</option>
        {options.map((book, index) => {
          return (
            <option key={index} value={index}>
              {book.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
