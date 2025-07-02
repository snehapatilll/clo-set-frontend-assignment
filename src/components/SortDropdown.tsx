import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSortOption } from '../redux/contentSlice';
import './SliderSortDropdown.scss';

const SortDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: RootState) => state.content.sortOption);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value as any));
  };

  return (
    <div className="sort-dropdown">
      <label>Sort by:</label>
      <select value={sortOption} onChange={handleChange}>
        <option >Item Name</option>
        <option >Higher Price</option>
        <option >Lower Price</option>
      </select>
    </div>
  );
};

export default SortDropdown;
