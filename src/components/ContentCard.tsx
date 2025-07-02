import React from 'react';
import { ContentItem } from '../redux/contentSlice';
import './ContentGrid.scss';

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  return (
    <div className="card">
      <img src={item.imageUrl} alt={item.title} />
      <div className='price-con'>  
        <div className='title-con'>
        <h4>{item.title}</h4>
        <p>By {item.userName}</p>
     </div>
        <div className='price'>{item.pricingOption === 'Paid' ? `$${item.price}` : item.pricingOption}</div></div>
    </div>
  );
};

export default ContentCard;
