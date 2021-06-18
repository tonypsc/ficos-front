import React from 'react';

export default function FilterItem({description, field, value, handleFilter}) {

    return(
        <>
            <div className="ms-3">
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={description} 
                        onChange={handleFilter} 
                        data-field={field}
                        data-value={value}
                    />
                    <label className="form-check-label" htmlFor={description}>
                    {description}
                    </label>
                </div>          
            </div>          
        </>
    );
}