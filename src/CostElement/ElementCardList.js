import React, { useEffect, useState } from 'react';
import ElementCard from './ElementCard';

export default function ElementCardList({search}) {

    const defaultValue = [
        {
            name: 'Azucar refino',
            mu: 'lb',
            price: '478.36'
        },
        {
            name: 'Arroz blanco',
            mu: 'kg',
            price: '11.25'
        },
        {
            name: 'Carne de cerdo limpia',
            mu: 'kg',
            price: '50.25'
        },
    ]

    const [elements, setElements] = useState(defaultValue);

    useEffect(e => {
        setElements(defaultValue);

        if(search) {
            let found = elements.filter(el => el.name.includes(search));
            setElements(found);
        }
    },[]);

    return(
        elements.map((el, index) => 
            <ElementCard 
                key={index}
                name={el.name}
                mu={el.mu}
                price={el.price}
                index={index}
            />
        )
    );
}