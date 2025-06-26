import React from 'react';
import { ContentItem } from '../redux/contentSlice';

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  return (
    <div className="card">
      <img src={item.imageUrl} alt={item.title} />
      <h4>{item.title}</h4>
      <p>By {item.userName}</p>
      <p>{item.pricingOption === 'Paid' ? `₹${item.price}` : item.pricingOption}</p>
    </div>
  );
};

export default ContentCard;
