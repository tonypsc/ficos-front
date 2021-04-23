import React from 'react';

export default function RecoverPwd() {
    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src="img/logo.png" alt="" style={{float: "right",  width: "48px"}}/>
            <h3>Recuperar contraseña</h3>
            <p className="">
                Por favor ingrese su dirección de correo y se le enviará un enlace que le permitirá
                recuperar su contraseña.
            </p>

            <form action="" method="post">
                <div className="mt-5">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control d-inline" 
                        maxLength="64"
                        autoFocus
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