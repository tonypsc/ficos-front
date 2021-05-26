import React, { useState, useEffect } from 'react';
import PasswordInput from './PasswordInput';

export default function ChagePwdForm({changeHandler, submitHandler}) {

    return(
        <>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <PasswordInput label="Contraseña" name="password" changeHandler={changeHandler} />
                </div>
                <div className="mb-3">
                    <PasswordInput label="Confirmar" name="confirm" changeHandler={changeHandler} />
                </div>

                <div className="mt-4">
                    <button className="btn btn-primary"><i className="fa fa-key"></i> Cambiar contraseña</button>
                </div>
            </form>
        </>
    )
}