import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setKeyword } from '../redux/contentSlice';
import './SearchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        placeholder="Find the items you're looking for..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">  <FontAwesomeIcon icon={faSearch} /></button>
    </form>
  );
};

export default SearchBar;
