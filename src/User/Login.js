import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PasswordInput from './PasswordInput';


export default function Login() {

    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src="img/logo.png" alt="" style={{float: "right",  width: "48px"}}/>
            <h3>Inicio de sesión</h3>
            <h5 className="fw-light">¡Hola empecemos!</h5>

            <form action="" method="post">
                <div className="mt-4">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        className="form-control d-inline" 
                        maxLength="64"
                        autoFocus
                    />
                    <i className="fa fa-user d-inline" style={{marginLeft: "-30px"}}></i>
                </div>

                <div className="mt-4">
                    <PasswordInput label="Contraseña" name="pwd" />
                </div>

                <div className="mt-5">
                    <button type="submit" className="btn btn-primary w-100">Iniciar</button>
                </div>

                <div className="mt-3 text-center mb-4">
                    <Link to="/recoverpwd" className="text-decoration-none"><small>Olvidé mi contraseña</small></Link>
                </div>
           </form>
        </main>
    )
}