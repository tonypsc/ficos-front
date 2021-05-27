import React, { useState, useEffect } from 'react';
import FileInput from '../Shared/FileInput';
import PasswordInput from './PasswordInput';
import placeHolder from '../Shared/assets/img/user_placeholder.png';

export default function UserForm({userName, fullName, photo, email, status, enterpriseId, rol, changeHandler, submitHandler, enterprises}) {

    return(
        <>
            <form onSubmit={submitHandler}>
                <div style={{height: "300px"}}>
                    <FileInput name="photo" defaultValue={photo} changeHandler={changeHandler} placeHolder={placeHolder} />
                </div>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Nombre de usuario</label>
                    <input 
                        type="text" 
                        name="userName"
                        className="form-control" 
                        autoFocus
                        defaultValue={userName} 
                        onChange={changeHandler}
                        required
                        maxLength="16"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Nombre completo</label>
                    <input 
                        type="text" 
                        name="fullName" 
                        id="expire_date" 
                        className="form-control" 
                        defaultValue={fullName} 
                        onChange={changeHandler}
                        required
                        maxLength="100"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control" 
                        defaultValue={email} 
                        onChange={changeHandler}
                        required
                        maxLength="500"
                    />
                </div>
                {
                    userName !== JSON.parse(localStorage.getItem('user')).userName
                        &&
                        <div className={`mb-3`}>
                            <label htmlFor="rol" className="form-label">Rol</label>
                            <select 
                                name="rol" 
                                id="rol" 
                                className="form-control" 
                                defaultValue={rol} 
                                onChange={changeHandler}
                                required
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                }
                {
                    enterprises.length > 1
                        &&
                        <div className={`mb-3 ${enterprises.length > 1 ? '' : 'd-none'}`}>
                            <label htmlFor="enterpriseId" className="form-label">Empresa</label>
                            <select 
                                name="enterpriseId" 
                                id="enterpriseId" 
                                className="form-control" 
                                defaultValue={enterpriseId} 
                                onChange={changeHandler}
                                required
                            >
                                {
                                    enterprises.map(el=> (
                                        <option key={el._id} value={el._id}>{el.name}</option>
                                    ))
        
                                }
                            </select>
                        </div>
                }
                {   !userName
                        &&
                            <>
                                <div className="mb-3">
                                    <PasswordInput label="Contraseña" name="password" changeHandler={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <PasswordInput label="Confirmar" name="confirm" changeHandler={changeHandler} />
                                </div>
                            </>
                }
                <div className="mb-5">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            defaultChecked={status} 
                            id="status" 
                            name="status" 
                            onClick={changeHandler}
                        />
                        <label className="form-check-label" htmlFor="active">Activo</label>
                    </div>                    
                </div>
                <div className="">
                    <button className="btn btn-primary"><i className="fa fa-save"></i> Guardar los cambios </button>
                </div>
            </form>
        </>
    );
}