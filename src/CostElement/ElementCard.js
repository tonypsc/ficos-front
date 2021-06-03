import React from 'react';

export default function ElementCard({_id, name, measureUnit, price, status, editHandle, deleteHandle}) {

    const formatPrice = price => {
        const parts = price.toString().split('.');
        if(parts.length === 1) return price.toFixed(2);
        if(parts[1].length >= 2) {
            return price;
        } else {
            return price.toFixed(2);
        }
    } 

    return(
        <div className={`row m-0 mt-1 py-2 rounded border-bottom`}>
            <div style={{width: "20px"}}>
                <i className="fa fa-file text-warning"></i>
            </div>
            <div className="col" >
                <span className="text-primary cursor-pointer" onClick={()=>editHandle({_id, name, measureUnit, price, status})}>
                    {`${name} (${measureUnit})`}
                </span>
            </div>
            <div className="col-auto text-end fw-bold">
                {formatPrice(price)}
            </div>
            <div className="text-end" style={{width: "70px"}}>
                <i className="fa fa-edit text-success cursor-pointer" onClick={()=>editHandle({_id, name, measureUnit, price, status})}></i>
                <i className="fa fa-times-circle text-orange cursor-pointer ms-2" data-id={_id} onClick={deleteHandle}></i>
            </div>
        </div>
    );

}