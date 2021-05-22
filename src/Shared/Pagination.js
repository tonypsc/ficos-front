import React from 'react';
import { Link } from 'react-router-dom';
import config from './config/general';

export default function Pagination({total, page, url}) {
    
    let pageNumber = parseInt(page);
    let pagesBefore = pageNumber - 1;
    let pagesAfter = total - pageNumber;
    const pagesToShow = config.paginationPages;
    let itemsBefore = [];
    let itemsAfter = [];
    let ellipsisBefore = null;
    let ellipsisAfter = null;
    let start = 1;
    let end = total;
    let beforeLink = pageNumber === 1 ? 1 : pageNumber -1;
    let nextLink = pageNumber === total ? pageNumber : pageNumber + 1;

    if(pagesBefore > pagesToShow) {
        start = pagesBefore - pagesToShow +1;
        ellipsisBefore = <Link to={url + '?page=' + (start -1) } className="btn btn-outline-primary ms-1 hide">...</Link>;
    }

    if(pagesAfter > pagesToShow) {
        end = pageNumber + pagesToShow;
        ellipsisAfter = <Link to={url + '?page=' + (end + 1) } className="btn btn-outline-primary ms-1 hide">...</Link>;
    }
    
    for(let i=start; i<=pagesBefore; i++) {
        itemsBefore.push(<Link to={url + '?page=' + i } key={i} className="btn btn-outline-primary ms-1 hide">{i}</Link>);
    }

    for(let i=(pageNumber + 1); i<=(end); i++) {
        itemsAfter.push(<Link to={url + '?page=' + i } key={i} className="btn btn-outline-primary ms-1 hide">{i}</Link>);
    }

    return (
        <>
            <div className="row mt-2">
                <div className="col d-flex justify-content-center">
                    <Link to={url + '?page=' + beforeLink } className="btn btn-primary">Anterior</Link>
                    {ellipsisBefore}
                    {itemsBefore.map(el => el)}
                    <Link to={url + '?page=' + pageNumber } className="btn btn-primary disabled ms-1">{page}</Link>
                    {itemsAfter.map(el => el)}
                    {ellipsisAfter}
                    <Link to={url + '?page=' + nextLink } className="btn btn-primary ms-1">Siguiente</Link>
                </div>
            </div>
        </>
    );
}