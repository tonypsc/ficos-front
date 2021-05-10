import React from 'react';

export default function SearchBox({placeHolder, handleChange}) {
    return(
        <div className="form-group">
            <input 
                type="text" 
                name="search" 
                id="search" 
                className="form-control d-inline pe-5" 
                placeholder={placeHolder + "..."}
                onChange={handleChange}
            />
            <i className="fa fa-search d-inline text-muted cursor-pointer search-icon"></i>
        </div>                                
    )
}