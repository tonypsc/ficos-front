import React from 'react';

export default function LinkSent() {
    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src="img/logo.png" alt="" style={{float: "right",  width: "48px"}}/>
            <h3>Enlace enviado</h3>
            <p>
                Se ha enviado un enlace a la dirección de correo especificada, 
                revise su correo y haga click en el mismo para completar el proceso de recuperación.
            </p>

            <div className="mt-5">
                <button type="submit" className="btn btn-primary w-100">Aceptar</button>
            </div>
        </main>

    )
}