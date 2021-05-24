import React from 'react';
import { Link } from 'react-router-dom';
import config from './config/general';

export default function Pagination({total, page, url, handleClick}) {
    
    let start = 1;
    let end = Math.ceil(total / config.itemsPerPage); // Recordcount / records per page
    let pageNumber = parseInt(page);
    let pagesBefore = pageNumber - 1;
    let pagesAfter = end - pageNumber;
    const pagesToShow = config.paginationSize;
    let itemsBefore = [];
    let itemsAfter = [];
    let ellipsisBefore = null;
    let ellipsisAfter = null;
    let beforeLink = pageNumber === 1 ? 1 : pageNumber -1;
    let nextLink = pageNumber === end ? pageNumber : pageNumber + 1;

    if(pagesBefore > pagesToShow) {
        start = pagesBefore - pagesToShow +1;
        ellipsisBefore = <button data-page={(start -1)} onClick={handleClick} className="btn btn-outline-primary ms-1 hide">...</button>;
    }

    if(pagesAfter > pagesToShow) {
        end = pageNumber + pagesToShow;
        ellipsisAfter = <button data-page={(end + 1)} onClick={handleClick} className="btn btn-outline-primary ms-1 hide">...</button>;
    }
    
    for(let i=start; i<=pagesBefore; i++) {
        itemsBefore.push(<button data-page={i} key={i} onClick={handleClick} className="btn btn-outline-primary ms-1 hide">{i}</button>);
    }

    for(let i=(pageNumber + 1); i<=(end); i++) {
        itemsAfter.push(<button data-page={i} key={i} onClick={handleClick} className="btn btn-outline-primary ms-1 hide">{i}</button>);
    }

    return (
        <>
            <div className="row mt-2">
                <div className="col d-flex justify-content-center">
                    <button data-page={beforeLink} onClick={handleClick} className="btn btn-primary">Anterior</button>
                    {ellipsisBefore}
                    {itemsBefore.map(el => el)}
                    <button data-page={pageNumber} onClick={handleClick} className="btn btn-primary disabled ms-1">{page}</button>
                    {itemsAfter.map(el => el)}
                    {ellipsisAfter}
                    <button data-page={nextLink} onClick={handleClick}className="btn btn-primary ms-1">Siguiente</button>
                </div>
            </div>
        </>
    );
}