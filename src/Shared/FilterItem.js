import React from 'react';

export default function FilterItem({description}) {

    return(
        <>
            <div className="ms-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id={description} />
                    <label className="form-check-label" htmlFor={description}>
                    {description}
                    </label>
                </div>          
            </div>          
        </>
    );
}