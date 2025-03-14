import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/titanic_banner.jpg'
import hero_title from '../../assets/titanic_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCardsAvaliados from '../../components/TitleCards/TitleCards-Avaliados'
import TitleCardsPopulares from '../../components/TitleCards/titleCards-Populares'
import TitleCardsTrend from '../../components/TitleCards/TitleCards-Trending'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
      <img src={hero_banner} alt="" className='banner-img'/>
      <div className="hero-caption">
        <img src={hero_title} alt="" className='caption-img'/>
        <p>Um artista pobre e uma jovem rica se conhecem e se apaixonam na fatídica viagem inaugural do Titanic em 1912. Embora esteja noiva do arrogante herdeiro de uma siderúrgica, a jovem desafia sua família e amigos em busca do verdadeiro amor.</p>
        <div className="hero-btns">
          <button className='btn'><img src={play_icon} alt="" />Assitir</button>
          <button className='btn dark-btn'>informações</button>
        </div>
        <h2>Filmes Populares</h2>
        <TitleCardsPopulares/>
        <h2>Filmes mais Avaliados</h2>
        <TitleCardsAvaliados/>
        <h2>Filmes Recomendados</h2>
        <TitleCardsTrend/>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
