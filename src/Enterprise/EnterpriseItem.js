import React from 'react';
import { Link } from 'react-router-dom';
import config from '../Shared/config/general';
import dateHelper from '../Shared/helpers/dateHelper';

export default function EnterpriseItem({enterprise, handleDelete}) {

    const {_id, name, logo, status, user, expireDate} = enterprise;

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
                Licencia: {dateHelper.getDateFromUts(expireDate)}
                <div className="text-muted lh-1">
                    <small>
                        ({dateHelper.getDaysLeft(expireDate) <= 0
                            ? <span className="text-danger">Licencia expirada</span>
                            : Math.ceil(dateHelper.getDaysLeft(expireDate)) + ' días'
                        })
                    </small>
                </div>
                <div className="mt-2">
                    <Link to={`/enterprise/edit?_id=${_id}`}  className="btn btn-success btn-sm" ><i className="fa fa-edit"></i> Editar</Link>
                    <button className="btn btn-orange btn-sm ms-2" data-id={_id} onClick={handleDelete} ><i className="fa fa-times"></i> Eliminar</button>
                </div>
            </div>
        </div>
    )
}