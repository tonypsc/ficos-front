import React from 'react';

export default function Alert({type, content, width = "w-50", closeButton, unSetError}) {
    function clearAlert() {
        unSetError(null);
    }
    return(
        <div  className={`alert alert-${type} py-2 start-50 translate-middle-x ${width}`}  style={{minWidth: "300px", zIndex: "1"}}>
            {closeButton 
                ? <span className="float-end cursor-pointer alert-close" onClick={clearAlert}>X</span>
                : ''
            }   
            {content}
        </div>
    )
}
