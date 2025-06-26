import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setKeyword } from '../redux/contentSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setKeyword(input));
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={input}
        placeholder="Search by name or title..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
