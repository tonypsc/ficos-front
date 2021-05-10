import React from 'react';

export default function ElementCard({name, mu, price, index}) {

    let backGround = (index % 2) !== 0 ? '' : 'bg-second';

    return(
        <div className={`row m-0 mt-1 py-2 rounded ${backGround}`}>
            <div style={{width: "20px"}}>
                <i className="fa fa-file"></i>
            </div>
            <div className="col">
                {`${name} (${mu})`}
            </div>
            <div className="col-auto text-end">
                ${price}
            </div>
            <div className="text-end" style={{width: "70px"}}>
                <i className="fa fa-edit text-primary me-1"></i>
                <i className="fa fa-times-circle text-danger"></i>
            </div>
        </div>
    );

}