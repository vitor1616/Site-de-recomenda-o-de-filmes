import React, { useEffect, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ user }) => {
  const [apiData, setApiData] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg'
      }
    })
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (user) {
      const storedRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
      setRatings(storedRatings[user.email] || {});
    }
  }, [user]);

  const handleRating = (movieId, value) => {
    if (!user) {
      alert("O filme foi adicionado aos favoritos!");
      return;
    }

    const storedRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
    const userRatings = storedRatings[user.email] || {};
    userRatings[movieId] = value;
    storedRatings[user.email] = userRatings;
    localStorage.setItem("userRatings", JSON.stringify(storedRatings));
    setRatings({ ...ratings, [movieId]: value });
  };

  return (
    <div className='title-cards'>
      <div className='card-list'>
        {apiData.map((card, index) => (
          <div key={index} className='card-container'>
            <Link to={`/player/${card.id}`} className='card' style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt='' />
              <p className='card-title'>
                {card.title.length > 40 ? card.title.slice(0, 37) + '...' : card.title}
              </p>
            </Link>
            <div className='rating'>
              <span 
                onClick={() => handleRating(card.id, 'up')} 
                style={{ cursor: 'pointer', color: ratings[card.id] === 'up' ? 'green' : 'gray' }}
              >
                👍
              </span>
              <span 
                onClick={() => handleRating(card.id, 'down')} 
                style={{ cursor: 'pointer', color: ratings[card.id] === 'down' ? 'red' : 'gray', marginLeft: '10px' }}
              >
                👎
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;