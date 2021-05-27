import React from 'react';

export default function Alert({type, content, closeButton, unSetError}) {
    function clearAlert() {
        unSetError(null);
    }
    return(
        <div  className={`alert alert-${type} py-2 start-50 translate-middle-x w-50`}  style={{minWidth: "300px", zIndex: "1"}}>
            {closeButton 
                ? <span className="float-end cursor-pointer alert-close" onClick={clearAlert}>X</span>
                : ''
            }   
            {content}
        </div>
    )
}
