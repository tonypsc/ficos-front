import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../Shared/SearchBox';
import { fetchData } from '../Shared/helpers/fetchHelper';
//import Pagination from '../Shared/Pagination';
import config from '../Shared/config/general';
import Alert from '../Shared/Alert';
import Loading from '../Shared/Loading';
import swal from 'sweetalert';
import { useLocation } from 'react-router-dom';
import EnterpriseItem from './EnterpriseItem';
import Pagination from '../Shared/Pagination';

export default function Enterprises({setMode}) {
    
    const [search, setSearch] = useState('');
    const [searchTemp, setSearchTemp] = useState('');
    const [enterprisesList, setEnterprises] = useState(null);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const location = useLocation();

    const getData = async () => {
        const url = `${config.apiUrl}enterprises?search=${search}&page=${page}&limit=${config.itemsPerPage}`;
        
        const result = await fetchData(url);

        if(result?.status !== 'success') {
            setError(result.errors);
            console.log(result.errors);
        } else {
            setTotalRecords(result.data.total);
            setEnterprises(result.data.enterprises);
            console.log(result.data.enterprises)
        }
    }

    function handleChange(e) {
        setSearchTemp(e.target.value);
    }

    function  handleSubmit(e) {
        e.preventDefault();
        setSearch(searchTemp);
    }

    function handleDelete(e) {
        swal({
            title: "¿Esta seguro que desea eliminar este elemento?",
            text: "¡Una vez eliminado no podrá ser recuperado!",
            icon: "warning",
            buttons: ['Cancelar', 'Eliminar'],
            dangerMode: true,       
        })
        .then(async (ok) => {
            if(!ok) return;
            
            const url = `${config.apiUrl}enterprises/${e.target.dataset.id}`;

            const result = await fetchData(url, 'DELETE')
            
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                getData();
            }
        })
    }

    useEffect(() => {
        getData();

    }, [page])

    function handlePaginationClick(e) {
        setPage(e.target.dataset.page);
    }

    return(
        <>

            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <SearchBox 
                            placeHolder="Buscar empresas" 
                            handleChange={handleChange}
                            handleSubmit = {handleSubmit}
                        />
                    </form>
                </div>
                <div className="" style={{width: "130px"}}>
                    <button onClick={setMode} data-mode="add" className="btn btn-primary w-100"> <i className="fa fa-plus"></i> Agregar</button>
                </div>
            </div>

            {/* title */}
            <div className="row">
                <div className="col px-3 py-4">
                    <h4 className="d-inline me-2">Empresas registradas</h4>
                    <small className="text-muted">{search && `(Mostrando coincidencias para '${search}' )`}</small>
                </div>
            </div>

            {enterprisesList
                ?
                    <>
                        {enterprisesList.map(e => (
                            <EnterpriseItem enterprise={e} key={e._id} handleDelete={handleDelete} setMode={setMode}/>
                        ))}
                        <Pagination page={page} total={totalRecords} url={config.apiUrl + 'enterprise'} handleClick={handlePaginationClick} />
                   </>
                : <Loading />
            }
        </>
    )    
}