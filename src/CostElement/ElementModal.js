import React from 'react';

export default function ElementModal() {

    return(
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{top: "150px"}}>
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Detalles</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form action="" method="post">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre </label>
                            <input type="text" list="browsers" className="form-control" autoFocus/>
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
                            <select name="measure" id="measure" className="form-select">
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input type="number" name="price" id="price" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="active" name="active" />
                                <label className="form-check-label" htmlFor="active">
                                Activo
                                </label>
                            </div>                    
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary w-100">Aceptar</button>
                </div>
            </div>
            </div>
        </div>
    );
}