import React from 'react';
import { Link } from 'react-router-dom';
import config from './config/general';

const Navigation = ({rol, active}) => {

    const options = config.menu[rol];

    return (
        options.map(option => (
            <li className="nav-item col-6 col-md-auto" key={option.caption}>
                <Link 
                    className={`nav-link p-2 ${active === option.caption ? 'active' : ''}`} 
                    aria-current={active === option.caption ? 'true' : false} 
                    to={'/' + option.link}
                >
                    {option.caption}
                </Link>
            </li>
        ))
    );
}

export default Navigation;
