import React from 'react';
import {Link} from 'react-router-dom';
import logo from './assets/img/logo.jpg';
import ficos from './assets/img/ficos.png';
import mail from './assets/img/mail.png';
import user from './assets/img/user.png';
import Navigation from './Navigation';

const Header = ({active}) => {

    return(
        <>

        <header className="navbar navbar-expand-md navbar-dark bd-navbar bg-main text-white">
            <nav className="container-xxl flex-wrap flex-md-nowrap" aria-label="Main navigation">

                <a className="navbar-brand p-0 me-2" href="/" aria-label="Bootstrap">
                    <img src={logo} alt="" style={{borderRadius: "50%", width: "48px", height: "48px"}} />
                    <img src={ficos} alt="logo" style={{height: "32px", width: "auto", marginLeft: "4px"}} />
                </a>
            
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="bi" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
            
                <div className="collapse navbar-collapse ms-3" id="bdNavbar">
                    
                    <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
                    <Navigation rol={JSON.parse(localStorage.user).rol} active={active} />
                    </ul>
                    
                    <hr className="d-md-none text-white-50" />
                
                    <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
                        <li className="nav-item col-6 col-md-auto">
                        <a className="nav-link p-2" href="/">
                            <img src={mail} alt="" style={{width: "36px", height: "36px"}} title="Notificaciones" />
                            <small className="d-md-none ms-2">Notificaciones</small>
                        </a>
                        </li>
                        <li className="nav-item col-6 col-md-auto dropdown">
                        <a className="nav-link p-2" href="/" id="userDropdown" href="#" data-bs-toggle="dropdown">
                            <img src={user} alt="" style={{width: "36px", height: "36px"}} title="Antonio" />
                            <small className="d-md-none ms-2 dropdown-toggle">Antonio</small>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li>
                                <Link className="dropdown-item" to={'/user/profile'}>
                                    <i className="fa fa-user"></i> Perfil
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/logout">
                                    <i className="fa fa-times-circle"></i> Cerrar sesión
                                </Link>
                            </li>
                        </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header;
