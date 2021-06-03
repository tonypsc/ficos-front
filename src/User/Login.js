import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import { fetchData } from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';

export default function Login() {

    const [formData, setFormData] = useState({username: '', pwd: ''});
    const [error, setError] = useState(null);
    const history = useHistory();

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const url = config.apiUrl + 'users/login';

        const result = await fetchData(url, 'POST', formData);
        
        if(result.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
            localStorage.setItem('token', result.token);
            sessionStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.data));
            
            // sa goes to enterprises
            if(result.data.rol === 'sa') {
                history.push('/enterprise')
            } else { // goes to costsheet
                history.push('/costsheet')
            }
        }
    }

    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src={require('../Shared/assets/img/logo.png').default} alt="" style={{float: "right",  width: "48px"}}/>
            <h3>Inicio de sesión</h3>
            <h5 className="fw-light">¡Hola empecemos!</h5>

            <div className={`alert alert-danger p-2 mt-3 ${error ? '' : 'd-none'}` } role="alert">
                { error }
            </div>

            <form onSubmit={handleSubmit} >
                <div className="mt-4">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        className="form-control d-inline" 
                        maxLength="64"
                        autoFocus
                        onChange={handleChange}
                    />
                    <i className="fa fa-user d-inline" style={{marginLeft: "-30px"}}></i>
                </div>

                <div className="mt-4">
                    <PasswordInput 
                        label="Contraseña" 
                        name="pwd"
                        changeHandler={handleChange}
                    />
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