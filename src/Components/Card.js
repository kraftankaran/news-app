import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="card-container">
      {data.map((article, index) => (
        <div key={index} className="card">
          <img src={article.urlToImage || "https://via.placeholder.com/300x200"} alt="news" />
          <div className="card-body">
            <h3>{article.title}</h3>
            <p>{article.description ? article.description.slice(0, 100) + '...' : "No description available."}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;