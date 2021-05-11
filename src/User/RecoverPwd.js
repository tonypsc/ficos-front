import React, { useState } from 'react';
import {fetchData} from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';
import { useHistory } from 'react-router-dom';

export default function RecoverPwd() {

    const history = useHistory();
    const [formData, setFormData] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const url = config.apiUrl + 'users/recoverpwd';

        const result = await fetchData(url, 'POST', formData);
        
        if(result?.status !== 'success') {
            setError(result.errors[0]);
        } else {
            history.push('/linksent');
        }
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src="img/logo.png" alt="" style={{float: "right",  width: "48px"}}/>
            <h3>Recuperar contraseña</h3>
            <p className="">
                Por favor ingrese su dirección de correo y se le enviará un enlace para
                recuperar su contraseña.
            </p>

            <div className={`alert alert-danger p-2 mt-3 ${error ? '' : 'd-none'}` } role="alert">
                { error }
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mt-5">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control d-inline" 
                        maxLength="64"
                        autoFocus
                        onChange={handleChange}
                        required
                    />
                    <i className="fa fa-envelope d-inline" style={{marginLeft: "-30px"}}></i>
                </div>

                <div className="mt-5">
                    <button type="submit" className="btn btn-primary w-100">Aceptar</button>
                </div>
            </form>
        </main>
    )
}