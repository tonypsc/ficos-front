import React from 'react';
import PasswordInput from './PasswordInput';

export default function Login({handleSubmit, handleChange, error}) {

    return (
        <>
            <h3>Restablecer contraseña</h3>
            <h5 className="fw-light">Ingrese la contraseña</h5>

            {error && 
                <div className={`alert alert-danger p-2 mt-5` } role="alert">
                { error }
                </div>
            }

            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <PasswordInput label="Contraseña" name="password" autoFocus="autoFocus" changeHandler={handleChange} />
                </div>

                <div className="mt-4">
                    <PasswordInput label="Confirmar" name="confirm" changeHandler={handleChange}/>
                </div>

                <div className="mt-5">
                    <button type="submit" className="btn btn-primary w-100">Aceptar</button>
                </div>
            </form>
        </>
    )
}