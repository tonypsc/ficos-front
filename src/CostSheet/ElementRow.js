import React from 'react';

const ElementRow = ({ elementData, handleEdit, handleDelete }) => {
    
    const {name, measureUnit, qty, price, amount } = elementData;
    
    return(
        <div className="row mt-2 mx-0">
            <div className="col-5 element-item">
                <div className="row">
                    <div className="col fw-bold">
                        {name}
                    </div>
                    <div className="py-1 text-end" style={{width: "100px"}}>
                        <i 
                            className="fa fa-edit cursor-pointer text-success" 
                            title="Editar" 
                            onClick={()=>handleEdit(elementData)}
                        ></i>
                        <i 
                            className="fa fa-times-circle ms-2 cursor-pointer text-orange" 
                            title="Eliminar" 
                            onClick={() => handleDelete(elementData._id)}
                        ></i>
                    </div>
                </div>
            </div>
            <div className="col m-0 text-center py-1">
                {measureUnit}
            </div>
            <div className="col m-0 text-end py-1">
                {qty}
            </div>
            <div className="col m-0 text-end py-1">
                {price}
            </div>
            <div className="col m-0 text-end py-1">
                {parseFloat(amount).toFixed(2)}
            </div>
        </div>        
    )
}

export default ElementRow;