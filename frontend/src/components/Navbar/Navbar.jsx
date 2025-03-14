import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/image.png';
import search_icon from '../../assets/search_icon.png';
import profile_icon from '../../assets/profile.png';

const Navbar = () => {
    const navRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark');
            } else {
                navRef.current.classList.remove('nav-dark');
            }
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
    };

    return (
        <div ref={navRef} className='navbar'>
            <div className='navbar-left'>
                <img src={logo} alt="" />
            </div>
            <div className='navbar-right'>
                <img src={search_icon} alt="" className='icons'/>
                <p>{user ? user.name : "Nome do Usuário"}</p>
                <div className='navbar-profile'>
                    <img src={profile_icon} alt="" className='profile'/>
                    <div className="dropdown">
                        <p onClick={handleLogout}>Sair da conta</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
