import React from 'react';
import EnterpriseItem from './EnterpriseItem';


export default function EnterpriseList({enterprises, handleDelete, page, search}) {

    return(
        <>
            {
                enterprises.map(e => (
                    <EnterpriseItem enterprise={e} key={e._id} handleDelete={handleDelete} page={page} search={search}/>
                ))
            }
        </>
    )
    
}