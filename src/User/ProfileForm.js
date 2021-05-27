import React from 'react';
import FileInput from '../Shared/FileInput';
import placeHolder from '../Shared/assets/img/user_placeholder.png';

export default function ProfileForm({fullName, photo, email, changeHandler, submitHandler}) {

    return(
        <>
            <form onSubmit={submitHandler}>
                <div style={{height: "300px"}}>
                    <FileInput name="photo" defaultValue={photo} changeHandler={changeHandler} placeHolder={placeHolder} />
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
                <div className="mt-4">
                    <button className="btn btn-primary"><i className="fa fa-save"></i> Guardar los cambios </button>
                </div>
            </form>
        </>
    );
}