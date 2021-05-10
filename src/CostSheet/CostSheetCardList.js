import React, { useState, useEffect } from 'react';
import CostSheetCard from './CostSheetCard';

export default function CostSheetCardList({search}) {
    const defaultValue = [
        {
            name: 'Pan con jamón',
            photo: 'Frame.png',
            type: 'Privado',
            user: 'tony',
            created: '25-12-2021',
            price: '50.25'
        },
        {
            name: 'Arroz congris',
            photo: 'Frame.png',
            type: 'Público',
            user: 'Aurelio',
            created: '25-12-2021',
            price: '12.25'
        },
    ];

    const [sheets, setSheets] = useState(defaultValue);

    useEffect(e => {
        setSheets(defaultValue);
        // Aqui es donde hago el fetch para obtener las sheets
        if(search) {
            let found = sheets.filter(el => el.name.includes(search));
            setSheets(found);
        }
    },[]);

    return(
        sheets.map((sheet, i) => (
            <CostSheetCard 
                key={i}
                name={sheet.name}
                photoName={sheet.photo}
                type={sheet.type}
                user={sheet.user}
                created={sheet.created}
                price={sheet.price}
            />
        ))
    );

}