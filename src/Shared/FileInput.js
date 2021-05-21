import React, { useRef } from 'react';
import './assets/css/FileInput.css';

export default function FileInput({name, changeHandler}) {
    
    const fileInput = useRef();
    const image = useRef();

    function handleClick(e) {

        fileInput.current.addEventListener('change', (event) => {
            image.current.setAttribute('src', URL.createObjectURL(event.target.files[0]));
    
            image.current.addEventListener('load', () => {
                URL.revokeObjectURL(image.current.getAttribute('src'));
            })
        })

        fileInput.current.click();
    }
    
    return(
        <>
            <input 
                type="file" 
                name={name}
                className="d-none" 
                ref={fileInput} 
                onChange={changeHandler}
            />
                <img
                    src={require('./assets/img/Frame.png').default} 
                    alt="" 
                    className="img-select" 
                    onClick={handleClick}
                    ref={image}
                />
                
        </>
    )
}