import React from 'react';
import FilterItem from './FilterItem';

export default function FilterSet({listName, elements, size}) {

    let list = elements.length > size ? elements.slice(0, size) : elements;

    return(
        <>
            <p className="fw-bold mt-4">{listName}</p>
            {
                list.map(el => (
                    <FilterItem 
                        key={el}
                        description={el}
                    />
                ))
            }
        </>
    );

}