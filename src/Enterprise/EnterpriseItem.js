import React from 'react';

export default function EnterpriseItem({enterprise}) {

    const {name, logo, status, user, expireDate} = enterprise;

    return(
        <div className="row m-0 mt-1 py-2 border-bottom">
            <div style={{width: "128px"}}>
                {
                    logo 
                        ? <img src={require('../Shared/assets/img/logo.png').default} alt="logo" />
                        : <i className="fa fa-home fa-6x"></i>
                }
            </div>
            <div className="col">
                <h5>{name}</h5>
                <div className="text-muted">
                    <small> 
                        <i className="fa fa-check me-1"></i> 
                        Estado: {status === 1 ? 'Activa' : 'Inactiva'}
                    </small>
                </div>
                <div className="text-muted">
                    <small>
                        <i className="fa fa-user me-1"></i> 
                        Usuario: {user}
                    </small>
                </div>
            </div>
            <div className="col-auto text-end">
                Licencia: {expireDate}
                <div className="text-muted lh-1">
                    <small>
                        (125 días)
                    </small>
                </div>
                <div className="mt-2">
                    <button className="btn btn-success btn-sm" ><i className="fa fa-edit"></i> Editar</button>
                    <button className="btn btn-orange btn-sm mx-2" ><i className="fa fa-times"></i> Eliminar</button>
                    <button className="btn btn-secondary btn-sm" ><i className="fa fa-user"></i> Usuarios</button>
                </div>
            </div>
        </div>
    )
}