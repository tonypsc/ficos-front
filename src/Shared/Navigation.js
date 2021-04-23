import React from 'react';

const getOptions = rol => {
    let options = [
        'Inicio',
        'Fichas de costo',
        'Elementos',
        'Configuración'                
    ];

    if(rol == 'admin') options.push('Usuarios');
    
    if(rol == 'sa') options = [];

    return options;
}

const Navigation = ({rol, active}) => {

    const options = getOptions(rol);

    console.log(options);

    return (

        options.map(option => (
            <li className="nav-item col-6 col-md-auto" key={option}>
                <a className={`nav-link p-2 ${active == option ? 'active' : ''}`} aria-current={active == option ? 'true' : false} href="/">{option}</a>
            </li>
        ))

    )

//     <li className="nav-item col-6 col-md-auto">
//     <a className="nav-link p-2 active" aria-current="true" href="/">Inicio</a>
// </li>
// <li className="nav-item col-6 col-md-auto">
//     <a className="nav-link p-2" href="/">Fichas de costo</a>
// </li>
// <li className="nav-item col-6 col-md-auto">
//     <a className="nav-link p-2"  href="/">Elementos</a>
// </li>
// <li className="nav-item col-6 col-md-auto">
//     <a className="nav-link p-2" href="/">Configuración</a>
// </li>


}

export default Navigation;
