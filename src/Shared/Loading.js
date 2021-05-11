import React from 'react';

export default function Loading() {

    return(
        <>
            <div style={{width: "100%"}}>
                <div className="m-auto" style={{width: "100px"}}>
                    <img src={require('./assets/img/Loading.gif').default} alt="loading" style={{width: "100px"}} />
                </div>
            </div>
        </>
    )

}