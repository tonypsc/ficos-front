import React from 'react';
import {Link} from 'react-router-dom';
import dateHelper from '../Shared/helpers/dateHelper';

export default function CostSheetCard ({sheet, handleDelete, page, search}) {

    const {_id, photo, name, created, owner, _imposedPrice, topPrice, categories, _total } = sheet;

    const getImage = (photo) => {
        let result = require(`../Shared/assets/img/sheeticons/default.png`).default;
        try {
            result = require(`../Shared/assets/img/sheeticons/${photo}`).default;
        } catch (error) { }

        return result;
    }


    return(
        <>
            <div className="row border-top m-0 mt-4 border-top py-2">
                <div style={{width: "145px"}}>
                    <Link to={`/costsheet/edit?_id=${_id}&page=${page}&search=${search}`}>
                        <img src={getImage(photo)} alt="foto" className="ficha-picture"/>
                    </Link>
                </div>
                <div className="col pt-4">
                    <h5> <Link to={`/costsheet/edit?_id=${_id}&page=${page}&search=${search}`}>{`${name} ($${_total.toFixed(2)})`}</Link></h5>
                    <div><b>Creado:</b> {dateHelper.getDateFromUts(created, "d-m-y")} <b>Por:</b> {owner?.fullName}</div>
                    <div className="p-0 m-0">{categories.join(', ')}</div>
                    {(topPrice || topPrice > 0) &&
                        <div className="p-0 m-0"><b>Precio tope:</b> {topPrice.toFixed(2)}</div>
                    }
                </div>
                <div className="col text-end pt-4">
                    <h4 className="text-danger">${_imposedPrice.toFixed(2)}</h4>
                    <div className="pt-2">
                        <Link to={`/costsheet/edit?_id=${_id}&page=${page}&search=${search}`} className="btn btn-success mb-1" style={{width: "105px"}}>
                            <i className="fa fa-eye"></i> Detalles
                        </Link>
                        {JSON.parse(localStorage.getItem('user'))._id === owner?._id &&
                            <button className="btn btn-orange ms-2 mb-1" style={{width: "105px"}} onClick={handleDelete} data-id={_id}>
                                <i className="fa fa-times"></i> Eliminar
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}