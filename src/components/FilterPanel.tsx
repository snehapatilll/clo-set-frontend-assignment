import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PricingOption, setFilters, resetFilters } from '../redux/contentSlice';

const pricingOptions: PricingOption[] = ['Free', 'Paid', 'View Only'];

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.content.filters);

  const handleToggle = (option: PricingOption) => {
    const newFilters = selectedFilters.includes(option)
      ? selectedFilters.filter(f => f !== option)
      : [...selectedFilters, option];

    dispatch(setFilters(newFilters));
  };

  return (
    <div className="filter-panel">
      <h3>Pricing Options</h3>
      {pricingOptions.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            checked={selectedFilters.includes(option)}
            onChange={() => handleToggle(option)}
          />
          {option}
        </label>
      ))}

      <button onClick={() => dispatch(resetFilters())}>Reset</button>
    </div>
  );
};

export default FilterPanel;
