import React, { useRef } from 'react';

export default function PasswordInput({label, name, autoFocus, changeHandler}) {

    const refInput = useRef(),
        refBtn = useRef();

    const handleShowPwd = (e) => {
        refBtn.current.classList.toggle('fa-eye-slash');
        let type = refInput.current.getAttribute('type') == 'password' ? 'text' : 'password'
        refInput.current.setAttribute('type', type);
    }

    return(
        <>
            <label htmlFor={name} className="form-label">{label}</label>
            <input 
                type="password" 
                name={name} 
                id={name} 
                className="form-control d-inline" 
                maxLength="64"
                autoFocus={autoFocus}
                ref={refInput}
                onChange={changeHandler}
            />
            <i 
                className="fa fa-eye d-inline cursor-pointer" 
                style={{marginLeft: "-30px"}}
                onClick={handleShowPwd}
                ref={refBtn}
                >
            </i>
        </>
    );

}