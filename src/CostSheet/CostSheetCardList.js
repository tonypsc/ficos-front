import React, { useState, useEffect } from 'react';
import CostSheetCard from './CostSheetCard';

export default function CostSheetCardList({sheets, handleDelete, search, page}) {

    return(
        sheets.map((sheet, i) => (
            <CostSheetCard 
                key={i}
                sheet={sheet}
                handleDelete={handleDelete}
                search={search} 
                page={page}                
            />
        ))
    );

}