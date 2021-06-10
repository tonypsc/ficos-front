import React from 'react';
import FileInput from '../Shared/FileInput';

export default function ConfigurationForm({name, logo, expireDate, limitPrice, newSheetsPublic, comercialMargin, salesTaxes, daysLeft, changeHandler, submitHandler}) {

    return(
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        <i className="fa fa-home me-2"></i>
                        Empresa
                    </a>
                    <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        <i className="fa fa-key me-2"></i>
                        Gestionar licencia
                    </a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form onSubmit={submitHandler}>
                        <div style={{height: "300px"}}>
                            <FileInput name="logo" defaultValue={logo} changeHandler={changeHandler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre de la empresa</label>
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
                            <label htmlFor="comercialMargin" className="form-label">Margen comercial (%)</label>
                            <input 
                                type="number" 
                                name="comercialMargin"
                                className="form-control" 
                                autoFocus
                                defaultValue={comercialMargin} 
                                onChange={changeHandler}
                                max="100"
                                min="0"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="salesTaxes" className="form-label">Impuesto sobre las ventas (%)</label>
                            <input 
                                type="number" 
                                name="salesTaxes"
                                className="form-control" 
                                autoFocus
                                defaultValue={salesTaxes} 
                                onChange={changeHandler}
                                max="100"
                                min="0"
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    defaultChecked={limitPrice === undefined ? true : limitPrice} 
                                    id="limitPrice" 
                                    name="limitPrice" 
                                    onClick={changeHandler}
                                />
                                <label className="form-check-label" htmlFor="limitPrice">Permitir exceder precio tope</label>
                            </div>                    
                        </div>

                        <div className="mb-5">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    defaultChecked={newSheetsPublic === undefined ? true : newSheetsPublic} 
                                    id="newSheetsPublic" 
                                    name="newSheetsPublic" 
                                    onClick={changeHandler}
                                />
                                <label className="form-check-label" htmlFor="newSheetsPublic">Crear las nuevas fichas de costo como públicas</label>
                            </div>                    
                        </div>

                        <div className="">
                            <button className="btn btn-primary"><i className="fa fa-save"></i> Guardar los cambios </button>
                        </div>
                    </form>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                    <div className="mb-3 mt-4">
                        <label htmlFor="licence" className="form-label">Licencia vigente hasta</label>
                        <input 
                            type="text" 
                            name="expire_date" 
                            id="expire_date" 
                            className="form-control" 
                            defaultValue={`${expireDate} (${Math.ceil(daysLeft)} días)`} 
                            onChange={changeHandler}
                            disabled
                        />
                    </div>


                    <p className="">Seleccione un archivo de licencia y haga click en 'Agregar licencia' para renovar su liciencia del producto.</p>

                    <div className="">
                        <input 
                            type="file" 
                            name="licence"
                            className="form-control" 
                            autoFocus
                            onChange={changeHandler}
                            accept=".lic"
                        />
                    </div>

                    <div className="border d-none">

                    </div>

                    <div className="mt-5">
                        <button className="btn btn-primary"><i className="fa fa-plus"></i> Agregar licencia </button>
                    </div>

                </div>
            </div>            
            
            
            
            
        </>
    );
    
}