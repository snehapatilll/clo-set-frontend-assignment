import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContents } from './redux/contentSlice';
import { AppDispatch } from './redux/store';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import ContentGrid from './components/ContentGrid';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  return (
    <div className="app">
      <h1>Store Content</h1>
      <SearchBar />
      <FilterPanel />
      <ContentGrid />
    </div>
  );
};

export default App;

