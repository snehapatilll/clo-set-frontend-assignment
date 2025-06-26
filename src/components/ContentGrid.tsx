import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { loadMore } from '../redux/contentSlice';
import ContentCard from './ContentCard';

const ContentGrid: React.FC = () => {
  const { displayedData, loading } = useSelector((state: RootState) => state.content);
  const dispatch = useDispatch();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      dispatch(loadMore());
    }
  }, [dispatch]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) observerRef.current.observe(loader.current);

    return () => {
      if (loader.current) observerRef.current?.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <div className="content-grid">
      {displayedData.map(item => (
        <ContentCard key={item.id} item={item} />
      ))}
      {loading && <p>Loading...</p>}
      <div ref={loader}></div>
    </div>
  );
};

export default ContentGrid;
