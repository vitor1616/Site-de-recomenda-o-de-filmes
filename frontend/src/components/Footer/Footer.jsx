import React from 'react'
import './Footer.css'
import yt from '../../assets/youtube_icon.png'
import x from '../../assets/twitter_icon.png'
import fb from '../../assets/facebook_icon.png'
import insta from '../../assets/instagram_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={yt} alt="" />
        <img src={x} alt="" />
        <img src={fb} alt="" />
        <img src={insta} alt="" />
      </div>
      <ul>
        <li>Audio description</li>
        <li>Help center</li>
        <li>Gift Card</li>
        <li>Termos de uso</li>
        <li>Privacidade</li>
        <li>Contact us</li>
      </ul>
      <p className='copyright-text'>c 2025 Batata Inc</p>
    </div>
  )
}

export default Footer
