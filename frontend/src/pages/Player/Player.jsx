import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState(""); // Para buscar no YouTube se necessário

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg'
    }
  };

  useEffect(() => {
    setLoading(true);
    
    // 1️⃣ Busca os dados do filme para pegar o nome dele
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, options)
      .then(res => res.json())
      .then(movie => setMovieTitle(movie.title || "Filme"))
      .catch(err => console.error("Erro ao buscar título do filme:", err));

    // 2️⃣ Busca os trailers em inglês
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        let trailers = res.results?.filter(video => video.type === "Trailer");

        if (trailers.length > 0) {
          setApiData(trailers[0]);
        } else {
          // 3️⃣ Se não encontrou, busca em português
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`, options)
            .then(res => res.json())
            .then(res => {
              let trailersPt = res.results?.filter(video => video.type === "Trailer");
              
              if (trailersPt.length > 0) {
                setApiData(trailersPt[0]);
              } else {
                setApiData(null); // Nenhum vídeo encontrado
              }
            })
            .catch(err => console.error("Erro ao buscar trailer em português:", err));
        }
      })
      .catch(err => console.error("Erro ao buscar trailer em inglês:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Se não encontrou na API, gera um link de busca no YouTube
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " trailer")}`;

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Voltar" onClick={() => navigate('/')} />
      {loading ? (
        <p>Carregando trailer...</p>
      ) : apiData ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <div>
          <p>Trailer não disponível para este filme.</p>
          <a href={youtubeSearchUrl} target="_blank" rel="noopener noreferrer">
            🔍 Procurar trailer no YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default Player;
