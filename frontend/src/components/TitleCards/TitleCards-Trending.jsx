import React, { useEffect, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';

const TitleCards = ({ user }) => {
  const [apiData, setApiData] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
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
      const storedLikes = JSON.parse(localStorage.getItem("userLikes")) || {};
      setLikes(storedLikes[user.email] || {});
    }
  }, [user]);

  const handleLikeClick = (movieId) => {
    if (!user) {
      alert("O filme foi adicionado aos favoritos!");
      return;
    }

    const storedLikes = JSON.parse(localStorage.getItem("userLikes")) || {};
    const userLikes = storedLikes[user.email] || {};
    
    if (userLikes[movieId]) {
      delete userLikes[movieId];
    } else {
      userLikes[movieId] = true;
    }

    storedLikes[user.email] = userLikes;
    localStorage.setItem("userLikes", JSON.stringify(storedLikes));
    setLikes({ ...likes, [movieId]: userLikes[movieId] || false });
  };

  return (
    <div className='title-cards'>
      <div className='card-list'>
        {apiData.map((card, index) => (
          <div key={index} className='card-container'>
            <Link 
              to={`/player/${card.id}`} 
              className='card' 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt='' />
              <div className='card-title'>
                <p>{card.title.length > 40 ? card.title.slice(0, 37) + '...' : card.title}</p>
              </div>
            </Link>
            <div className='like-button' onClick={() => handleLikeClick(card.id)}>
              <ThumbsUp size={24} color={likes[card.id] ? 'blue' : 'gray'} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
