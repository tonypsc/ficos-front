import React from 'react';
import config from '../Shared/config/general';

export default function EnterpriseItem({enterprise}) {

    const {name, logo, status, user, expireDate} = enterprise;

    function getExpireDate(expDate) {
        let date = new Date(expDate);
        return date.getDate().toString().padStart(2, '0') 
                + '-' + (date.getMonth() + 1).toString().padStart(2, '0') 
                + '-' + date.getFullYear();
    }

    function getDaysLeft(expDate) {
        let diff = expDate - Date.now();
        let daysLeft = diff/1000/60/60/24;
        return daysLeft;
    }

    return(
        <div className="row m-0 mt-1 py-2 border-bottom">
            <div style={{width: "128px"}}>
                <img src={config.apiUrl + 'uploads/' + logo } alt="logo" style={{width: "100%"}} onError={(e)=> e.target.src=require('../Shared/assets/img/logo_placeholder.jpg').default} />
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
                Licencia: {getExpireDate(expireDate)}
                <div className="text-muted lh-1">
                    <small>
                        ({getDaysLeft(expireDate) <= 0
                            ? <span className="text-danger">Licencia expirada</span>
                            : Math.ceil(getDaysLeft(expireDate)) + ' días'
                        })
                    </small>
                </div>
                <div className="mt-2">
                    <button className="btn btn-success btn-sm" ><i className="fa fa-edit"></i> Editar</button>
                    <button className="btn btn-orange btn-sm ms-2" ><i className="fa fa-times"></i> Eliminar</button>
                </div>
            </div>
        </div>
    )
}