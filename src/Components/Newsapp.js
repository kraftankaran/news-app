import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
  const [search, setSearch] = useState('india');
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'fcb70105ef224a6b8bdb3be9fa19e426';

  const getData = async (query = search, pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&pageSize=10&page=${pageNum}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();

      if (jsonData.articles && jsonData.articles.length > 0) {
        setNewsData((prev) => (append ? [...prev, ...jsonData.articles] : jsonData.articles));
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(search, 1, false);
    setPage(1);
  }, [search]);

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleSearchClick = () => {
    if (search.trim() === '') return;
    getData(search, 1, false);
    setPage(1);
  };

  const handleCategoryClick = (category) => {
    setSearch(category);
    getData(category, 1, false);
    setPage(1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
      hasMore &&
      !loading
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      getData(search, nextPage, true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div>
      <nav>
        <div>
          <h1>Trendy News</h1>
        </div>
        <ul>
          <a href="#">All News</a>
          <a href="#">Trending</a>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInputChange}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </nav>

      <p className="head">Stay Updated with TrendyNews</p>

      <div className="categoryBtn">
        {['sports', 'politics', 'entertainment', 'health', 'fitness'].map((cat) => (
          <button key={cat} onClick={() => handleCategoryClick(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {newsData.length > 0 ? (
        <Card data={newsData} />
      ) : (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      )}

      {loading && <p style={{ textAlign: 'center' }}>Loading more...</p>}
    </div>
  );
};

export default Newsapp;
