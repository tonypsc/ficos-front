import React from 'react';
import config from './config/general';

const Navigation = ({rol, active}) => {

    const options = config.menu[rol];

    return (
        options.map(option => (
            <li className="nav-item col-6 col-md-auto" key={option}>
                <a className={`nav-link p-2 ${active == option ? 'active' : ''}`} aria-current={active == option ? 'true' : false} href="/">{option}</a>
            </li>
        ))
    );
}

export default Navigation;
