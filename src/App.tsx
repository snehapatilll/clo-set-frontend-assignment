import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContents } from './redux/contentSlice';
import { AppDispatch } from './redux/store';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import ContentGrid from './components/ContentGrid';
import SortDropdown from './components/SortDropdown';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  return (
    <div className="app">
      <SearchBar />
      <FilterPanel />
      <SortDropdown />
      <ContentGrid />
    </div>
  );
};

export default App;

