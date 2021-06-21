import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
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
import Login from '../User/Login';

const CostSheet = () => {
    
    const [search, setSearch] = useState('');
    const [searchTemp, setSearchTemp] = useState('');
    const [costSheets, setCostSheets] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categorySize, setCategorySize] = useState(5);
    const [filter, setFilter] = useState('[]');
    const history = useHistory();

    const getData = async ()=> {
        const url = `${config.apiUrl}costsheets?page=${page}&search=${search}&limit=${config.itemsPerPage}&filter=${filter}`;
        const result = await fetchData(url);

        if(result?.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
            setCostSheets(result.data.docs);
            setTotalRecords(result.data.total)
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

        /**
         * Gets the list of categories
         */
         const getCategories = async () => {
            const url = `${config.apiUrl}categories`;
            const result = await fetchData(url);
    
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setCategories(result.data);
            }
        }

        getCategories();


    }, [])

    useEffect(() => {
        getData();
    }, [page, search, filter])

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

    const handleEdit = () => {
        alert('editing');
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
            
            const url = `${config.apiUrl}costsheets/${e.target.dataset.id}`;

            const result = await fetchData(url, 'DELETE')
            
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                getData();
            }
        })
    }

    const handleChangeCategorySize = (e) => {
        setCategorySize(categorySize * 2);
    }

    const handleFilter = (e) => {
        let filterEdit = JSON.parse(filter);
        let condition = {field:e.target.dataset['field'], value: e.target.dataset['value']};

        if(e.target.checked) {
            filterEdit.push(condition)
        } else {
            const index = filterEdit.findIndex(el => (el.field === condition.field && el.value === condition.value));
            if(index !== -1) 
                filterEdit.splice(index, 1);
        }

       
        setFilter(JSON.stringify(filterEdit));
    }

    return(
        <>
            <Header active="Fichas de costo"/>

            <main className="container-xxl">
                {error
                    ?   <div className="mt-5"><Alert content={error} type="danger" /></div>
                    : 

                    <div className="row">
                        <aside className="vh-100 search-panel p-4 border-end" style={{width: "250px"}}>
                            
                            <FilterSet
                                listName="Precio"
                                size="6"
                                elements={[
                                    {
                                        description: "de 0 a 25",
                                        field: 'price',
                                        value: '{"min":0, "max":25}'
                                    }, 
                                    {
                                        description: "de 25 a 50",
                                        field: 'price',
                                        value: '{"min":25, "max":50}'
                                    }, 
                                    {
                                        description: "de 50 a 100",
                                        field: 'price',
                                        value: '{"min":50, "max":100}'
                                    }, 
                                ]}
                                handleFilter={handleFilter}
                            />

                            {categories.length > 0 &&
                                <FilterSet
                                    listName="Categoría"
                                    size={categorySize}
                                    elements={categories.map(cat=>({description: cat.name, field: 'categories', value: cat.name}))}
                                    handleChangeSize={handleChangeCategorySize}
                                    handleFilter={handleFilter}
                                />
                            }

                            <FilterSet
                                listName="Creada por"
                                size="5"
                                elements={[
                                    {
                                        description: JSON.parse(localStorage.getItem('user')).fullName,
                                        field: 'owner',
                                        value: JSON.parse(localStorage.getItem('user')).fullName
                                    }, 
                                ]
                                }
                                handleFilter={handleFilter}
                            />

                            <FilterSet
                                listName="Fecha"
                                size="5"
                                elements={[
                                    {
                                        description: "Hoy",
                                        field: 'created',
                                        value: 'today'
                                    }, 
                                    {
                                        description: "Ayer",
                                        field: 'created',
                                        value: 'yesterday'
                                    }, 
                                    {
                                        description: "Esta semana",
                                        field: 'created',
                                        value: 'week'
                                    }, 
                                    {
                                        description: "Este mes",
                                        field: 'created',
                                        value: 'month'
                                    }, 
                                ]}
                                handleFilter={handleFilter}
                            />

                        </aside>

                        <div className="col p-4">
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={handleSubmit}>
                                        <SearchBox 
                                            placeHolder="Buscar fichas de costo" 
                                            handleChange={handleChange}
                                            handleSubmit = {handleSubmit}
                                        />
                                    </form>
                                </div>
                                <div className="" style={{width: "130px"}}>
                                    <Link 
                                        to="/costsheet/edit?_id=new" 
                                        className="btn btn-primary w-100"
                                    > 
                                        <i className="fa fa-plus"></i> Agregar
                                    </Link>
                                </div>
                            </div>
                            
                            {search &&
                                <div className="text-muted"><small>Mostrando conincidencias para '{search}'</small></div>
                            }

                            {/* List of sheets */}
                             {costSheets
                                ?
                                    costSheets.length === 0
                                    ?
                                        <div className="mt-4">{config.messages.noRecords}</div>
                                    :
                                        <>
                                            <CostSheetCardList 
                                                sheets={costSheets} 
                                                handleDelete={handleDelete} 
                                                search={search} 
                                                page={page} 
                                            />
                                            <Pagination 
                                                page={page} 
                                                total={totalRecords} 
                                                handleClick={handlePaginationClick} 
                                            />
                                        </>
                                : <Loading />
                        
                             }
                        </div>
                    </div>
                }                
            </main>
        </>
    )
}

export default CostSheet;
