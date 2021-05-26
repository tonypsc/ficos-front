import React from 'react';
import UserItem from './UserItem';


export default function UserList({data, handleDelete, page, search}) {

    return(
        <>
            {
                data.map(e => (
                    <UserItem data={e} key={e._id} handleDelete={handleDelete} page={page} search={search}/>
                ))
            }
        </>
    )
    
}