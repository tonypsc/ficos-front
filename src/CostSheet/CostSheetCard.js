import React from 'react';

export default function CostSheetCard ({ photoName, name, created, user, type, price, limited }) {

    return(
        <>
            <div className="row border-top m-0 mt-4 border-top py-2">
                <div style={{width: "145px"}}>
                    <a href="/">
                        <img src={require(`../Shared/assets/img/${photoName}`).default} alt="foto" className="ficha-picture"/>
                    </a>
                </div>
                <div className="col pt-4">
                    <h5> <a href="/">{name}</a></h5>
                    <div>Creado: {created} Por: {user}</div>
                    <div className="p-0 m-0 text-muted">{type}</div>
                </div>
                <div className="col text-end pt-4">
                    <h4 className="text-danger">${price}</h4>
                    <div className="pt-2">
                        <button className="btn btn-success mb-1" style={{width: "105px"}}><i className="fa fa-paste"></i> Duplicar</button>
                        <button className="btn btn-orange ms-2 mb-1" style={{width: "105px"}}><i className="fa fa-times"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    );

}