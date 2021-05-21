import React from 'react';
import FileInput from '../Shared/FileInput';


export default function EnterpriseForm({name, logo, expireDate, status, changeHandler, submitHandler}) {

    //let expireDateString = `${expireDate.getFullYear()}-${(expireDate.getMonth() + 1).toString().padStart(2, '0')}-${expireDate.getDate().toString().padStart(2, '0')}`;

    return(
        <>
            <form onSubmit={submitHandler}>
                <div style={{height: "300px"}}>

                    <FileInput name="logo" defaultValue={logo} changeHandler={changeHandler} />

                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre </label>
                    <input 
                        type="text" 
                        name="name"
                        className="form-control" 
                        autoFocus
                        defaultValue={name} 
                        onChange={changeHandler}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="licence" className="form-label">Licencia vigente hasta</label>
                    <input 
                        type="date" 
                        name="expire_date" 
                        id="expire_date" 
                        className="form-control" 
                        defaultValue={''} 
                        onChange={changeHandler}
                    />
                </div>
                <div className="mb-5">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            defaultValue={status} 
                            id="active" 
                            name="active" 
                            onChange={changeHandler}
                        />
                        <label className="form-check-label" htmlFor="active">Activa</label>
                    </div>                    
                </div>
                <div className="">
                    <button className="btn btn-primary"><i className="fa fa-save"></i> Guardar los cambios </button>
                </div>
            </form>
        </>
    );
    
}