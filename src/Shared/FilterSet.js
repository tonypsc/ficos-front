import React from 'react';
import FilterItem from './FilterItem';

export default function FilterSet({listName, elements, size, handleChangeSize, handleFilter}) {

    let list = elements.length > size ? elements.slice(0, size) : elements;

    return(
        <>
            <p className="fw-bold mt-4">{listName}</p>
            {
                list.map(el => (
                    <FilterItem 
                        key={el.description}
                        description={el.description}
                        handleFilter={handleFilter}
                        field={el.field}
                        value={el.value}
                    />
                ))
            }
            {elements.length > size &&
                <a className="ms-3 cursor-pointer" onClick={handleChangeSize}>
                    Mostra más
                </a>
            }
            
        </>
    );

}