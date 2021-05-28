import React, { useEffect, useState } from 'react';
import ElementCard from './ElementCard';

export default function ElementCardList({elements, editHandle, deleteHandle}) {

    return(
        elements.map((el) => 
            <ElementCard 
                key={el._id}
                name={el.name}
                measureUnit={el.measureUnit}
                price={el.price}
                status={el.status}
                _id={el._id}
                editHandle={editHandle}
            />
        )
    );
}