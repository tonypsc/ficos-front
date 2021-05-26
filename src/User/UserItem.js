import React from 'react';
import { Link } from 'react-router-dom';
import config from '../Shared/config/general';
import dateHelper from '../Shared/helpers/dateHelper';

export default function UserItem({data, handleDelete, page, search}) {

    const {_id, userName, fullName, photo, email, status, rol, createdAt, enterpriseName} = data;
    const user = JSON.parse(localStorage.getItem('user'));

    return(
        <div className="row m-0 mt-1 py-2 border-bottom">
            <div style={{width: "128px"}}>
                <img src={config.apiUrl + 'uploads/' + photo } alt="photo" style={{width: "100%"}} onError={(e)=> e.target.src=require('../Shared/assets/img/user.png').default} className="rounded-circle" />
            </div>
            <div className="col">
                <h5>{fullName}</h5>
                <div className="text-muted">
                    <small>
                        <i className="fa fa-user me-1"></i> 
                        Usuario: {userName}
                    </small>
                </div>
                <div className="text-muted">
                    <small> 
                        <i className="fa fa-check me-1"></i> 
                        Estado: {status === 1 ? 'Activo' : 'Inactivo'}
                    </small>
                </div>
                <div className="text-muted">
                    <small> 
                        <i className="fa fa-calendar me-1"></i> 
                        Creado: {dateHelper.getDateFromUts(createdAt, 'd-m-y')}
                    </small>
                </div>
            </div>
            <div className="col-auto text-end">
                <div><i className="fa fa-envelope me-1"></i><a href={'mailto:' + email}>{email}</a></div>
                <div className="text-muted"><small>Rol: {rol}</small></div>
                {
                            user.rol === 'sa'
                                ?
                                    <small className="text-muted">
                                        <i className="fa fa-home mx-1"></i> 
                                        Empresa: {enterpriseName}
                                    </small>
                                : ''
                        }                        
                <div className="mt-2">
                    <Link to={`/user/edit?_id=${_id}&page=${page}&search=${search}`}  className="btn btn-success btn-sm" ><i className="fa fa-edit"></i> Editar</Link>
                    <button className="btn btn-orange btn-sm ms-2" data-id={_id} onClick={handleDelete} ><i className="fa fa-times"></i> Eliminar</button>
                </div>
            </div>
        </div>
    )
}