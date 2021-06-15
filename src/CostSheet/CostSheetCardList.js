import React, { useState, useEffect } from 'react';
import CostSheetCard from './CostSheetCard';

export default function CostSheetCardList({search, sheets}) {

    return(
        sheets.map((sheet, i) => (
            <CostSheetCard 
                key={i}
                sheet={sheet}
            />
        ))
    );

}