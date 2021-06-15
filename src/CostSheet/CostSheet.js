import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import FilterSet from '../Shared/FilterSet';
import Header from '../Shared/Header';
import SearchBox from '../Shared/SearchBox';
import CostSheetCardList from './CostSheetCardList';
import config from '../Shared/config/general';
import {fetchData} from '../Shared/helpers/fetchHelper';
import swal from 'sweetalert';
import Pagination from '../Shared/Pagination';
import Alert from '../Shared/Alert';
import Loading from '../Shared/Loading';

const CostSheet = () => {
    
    const [search, setSearch] = useState('');
    const [searchTemp, setSearchTemp] = useState('');
    const [costSheets, setCostSheets] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    
    const getData = async ()=> {
        const url = `${config.apiUrl}costsheets?page=${page}&search=${search}&limit=${config.itemsPerPage}`;
        const result = await fetchData(url);

        if(result?.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
            setCostSheets(result.data.docs);
        }
    }

    useEffect(() => {
        const queryPage = (new URLSearchParams(window.location.search)).get("page");
        const querySearch = (new URLSearchParams(window.location.search)).get("search");

        if(queryPage) setPage(queryPage);
        if(querySearch) {
            console.log({querySearch});
            setSearch(querySearch);
        }
    }, [])

    useEffect(() => {
        getData();
    }, [page, search])

    function handlePaginationClick(e) {
        setPage(e.target.dataset.page);
    }

    function  handleSubmit(e) {
        e.preventDefault();
        setSearch(searchTemp);
    }

    const handleChange = (e) => {
        setSearchTemp(e.target.value);
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

    return(
        <>
            <Header active="Fichas de costo"/>

            <main className="container-xxl">
                <div className="row">
                    <aside className="vh-100 search-panel p-4 border-end" style={{width: "250px"}}>
                        
                        <FilterSet
                            listName="Precio"
                            size="6"
                            elements={["de 0 a 25", "25 a 50", "50 a 100"]}
                        />

                        <FilterSet
                            listName="Categoría"
                            size="5"
                            elements={["Comida", "Bebida", "Merienda", "Otros"]}
                        />

                        <FilterSet
                            listName="Tipo"
                            size="5"
                            elements={["Público", "Privado"]}
                        />

                        <FilterSet
                            listName="Creado"
                            size="5"
                            elements={["Hoy", "Ayer", "Esta semana", "Este año"]}
                        />

                    </aside>

                    <div className="col p-4">
                        <div className="row">
                            <div className="col">
                                <form action="#" method="get">
                                    <SearchBox 
                                        placeHolder="Buscar fichas de costo" 
                                        handleChange={handleChange}
                                    />
                                </form>
                            </div>
                            <div className="" style={{width: "130px"}}>
                                <Link to="/costsheet/edit?_id=new" className="btn btn-primary w-100"> <i className="fa fa-plus"></i> Agregar</Link>
                            </div>
                        </div>
                    
                        {/* List of sheets */}
                        {error
                            ?   <Alert content={error} />
                            : 
                                    costSheets
                                        ?
                                            <>
                                                <CostSheetCardList sheets={costSheets} />
                                                <Pagination page={page} total={totalRecords} handleClick={handlePaginationClick} />
                                            </>
                                        : <Loading />
                        }  

                    </div>
                </div>
            </main>
        </>
    )
}

export default CostSheet;
