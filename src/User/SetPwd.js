import React from 'react';
import { Link } from 'react-router-dom';

const showPwd = (e) => {
    e.target.classList.toggle('fa-eye-slash');
    const $pwd =  document.getElementById(e.target.dataset.pwd);
    let type = $pwd.getAttribute('type') == 'password' ? 'text' : 'password'
    $pwd.setAttribute('type', type);
}

export default function Login() {
    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src="img/logo.png" alt="" style={{float: "right",  width: "48px"}}/>
            <h3>Restablecer contraseña</h3>
            <h5 className="fw-light">Ingrese la contraseña</h5>

            <form action="" method="post">
                <div className="mt-4">
                    <label htmlFor="pwd" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        name="pwd" 
                        id="pwd" 
                        className="form-control d-inline" 
                        maxLength="64"
                        autoFocus
                    />
                    <i 
                        className="fa fa-eye d-inline" 
                        style={{marginLeft: "-30px"}}
                        data-pwd="pwd"
                        onClick={showPwd}>
                    </i>
                </div>

                <div className="mt-4">
                    <label htmlFor="confirm" className="form-label">Confirmar</label>
                    <input 
                        type="password" 
                        name="confirm" 
                        id="confirm" 
                        className="form-control d-inline"
                        maxLength="64"
                    />
                    <i 
                        className="fa fa-eye d-inline" 
                        style={{marginLeft: "-30px"}} 
                        title="Mostrar / Ocultar" 
                        data-pwd="confirm"
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top"
                        onClick={showPwd}>
                    </i>
                </div>

                <div className="mt-5">
                    <button type="submit" className="btn btn-primary w-100">Aceptar</button>
                </div>
            </form>
        </main>

    )
}