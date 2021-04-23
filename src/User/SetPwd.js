import React from 'react';
import { Link } from 'react-router-dom';
import PasswordInput from './PasswordInput';

export default function Login() {

    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src="img/logo.png" alt="" style={{float: "right",  width: "48px"}}/>
            <h3>Restablecer contraseña</h3>
            <h5 className="fw-light">Ingrese la contraseña</h5>

            <form action="" method="post">
                <div className="mt-4">
                    <PasswordInput label="Contraseña" name="pwd" autoFocus="autoFocus" />
                </div>

                <div className="mt-4">
                    <PasswordInput label="Confirmar" name="confirm" />
                </div>

                <div className="mt-5">
                    <button type="submit" className="btn btn-primary w-100">Aceptar</button>
                </div>
            </form>
        </main>

    )
}