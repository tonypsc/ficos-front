import React, {useEffect, useRef} from 'react';
import Alert from '../Shared/Alert';

export default function ElementModal({name, measureUnit, price, status, handleChange, handleSubmit, show, error}) {

    const refCloseBtn = useRef();

    useEffect(()=>{
        console.log(show + '  ddd');
        if(!show)
            refCloseBtn.current.click();
    },[show])

    return(
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{top: "150px"}}>
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">Detalles</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refCloseBtn}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                                { error &&
                                    <Alert type="danger" content={error}/>
                                }
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre </label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        list="browsers" 
                                        className="form-control" 
                                        autoFocus
                                        value={name || ''}
                                        onChange={handleChange}
                                    />
                                    <datalist id="browsers">
                                        <option value="Internet Explorer" />
                                        <option value="Firefox" />
                                        <option value="Chrome" />
                                        <option value="Opera" />
                                        <option value="Safari" />
                                    </datalist>                        
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="measure" className="form-label">UM</label>
                                    <select 
                                        name="measureUnit" 
                                        id="measureUnit" 
                                        className="form-select"
                                        onChange={handleChange}
                                        value={measureUnit || ''}
                                    >
                                        <option>alguna</option>
                                        <option>otra</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Precio</label>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        id="price" 
                                        className="form-control" 
                                        onChange={handleChange}
                                        value={price || '0'}
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            checked={status}
                                            id="status" 
                                            name="status" 
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="status">
                                        Activo
                                        </label>
                                    </div>                    
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary w-100">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}