import React from 'react';

export default function ElementCard({_id, name, measureUnit, price, status, editHandle, deleteHandle}) {

    // let backGround = (index % 2) !== 0 ? '' : 'bg-second';

    return(
        <div className={`row m-0 mt-1 py-2 rounded border-bottom`}>
            <div style={{width: "20px"}}>
                <i className="fa fa-file text-warning"></i>
            </div>
            <div className="col text-primary cursor-pointer">
                {`${name} (${measureUnit})`}
            </div>
            <div className="col-auto text-end">
                ${price.toFixed(2)}
            </div>
            <div className="text-end" style={{width: "70px"}}>
                <i className="fa fa-edit text-success cursor-pointer" onClick={()=>editHandle({_id, name, measureUnit, price, status})}></i>
                <i className="fa fa-times-circle text-orange cursor-pointer ms-2" onClick={deleteHandle}></i>
            </div>
        </div>
    );

}