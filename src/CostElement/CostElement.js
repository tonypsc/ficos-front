import React, { useState, useEffect, useRef } from 'react';
import Header from '../Shared/Header';
import SearchBox from '../Shared/SearchBox';
import ElementCardList from './ElementCardList';
import ElementModal from './ElementModal';
import config from '../Shared/config/general';
import {fetchData} from '../Shared/helpers/fetchHelper';
import Loading from '../Shared/Loading';
import Alert from '../Shared/Alert';
import Pagination from '../Shared/Pagination';
import {Modal} from 'bootstrap';

const CostElement = () => {
    
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null);
    const [searchTemp, setSearchTemp] = useState('');
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const refAddButton = useRef()

    const getData = async () => {
        const url = `${config.apiUrl}elements?search=${search}&page=${page}&limit=${config.itemsPerPage}`;
        
        const result = await fetchData(url);

        if(result?.status !== 'success') {
            setError(result.errors);
        } else {
            setTotalRecords(result.data.total);
            setData(result.data.elements);
            console.log(result.data.elements);
        }
    }

    useEffect(()=> {
        getData();
    },[])    

    function searchChangeHandler(e) {
        setSearchTemp(e.target.value);
    }

    function  searchSubmitHandler(e) {
        e.preventDefault();
        setSearch(searchTemp);
    }

    function handlePaginationClick(e) {
        setPage(e.target.dataset.page);
    }

    function changeHandler(e) {

        if(e.target.type === 'file') {
            setFormData({...formData, [e.target.name]: e.target.files[0]});
        } else if(e.target.type === 'checkbox') {
            setFormData({...formData, [e.target.name]: e.target.checked});
        } else if(e.target.name === 'enterpriseId') { 
            setFormData({...formData, [e.target.name]: e.target.value, enterpriseName: e.target.options[e.target.selectedIndex].text});
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    async function updateSubmitHandler(e) {
        e.preventDefault();

        console.log('del formulario', formData);

        const url = config.apiUrl + 'elements';
        const method = formData._id===null ? 'POST' : 'PATCH';
        
        const result = await fetchData(url, method, formData);

        console.log(result);
        
        if(result.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
        }

        const s = new Modal(document.getElementById('editmodal'));
        console.log(s);
        s.hide();
    }

    const loadModal = (data) => {
        setFormData(data);
        console.log('originales',data);
        refAddButton.current.click();
    }

    return(
        <>
            <Header active="Elementos"/>

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        
                        <div className="row">
                            <div className="col">
                                <form onSubmit={searchSubmitHandler}>
                                    <SearchBox 
                                        placeHolder="Buscar empresas" 
                                        handleChange={searchChangeHandler}
                                        handleSubmit = {searchSubmitHandler}
                                    />
                                </form>
                            </div>
                            <div className="" style={{width: "130px"}}>
                                <button  type="button" className="btn btn-primary w-100" onClick={()=>loadModal({_id: null})}><i className="fa fa-plus"></i> Agregar</button>
                                <button id="btnadd"  type="button" className="d-none" data-bs-target="#editModal" data-bs-toggle="modal" ref={refAddButton}>algo</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col px-3 py-4">
                                <h4>Elementos de costo/gasto</h4>
                            </div>
                        </div>

                        {error
                            ?   <Alert type="danger" content={error} />
                            :  data 
                                ? data.length === 0
                                    ? config.messages.noRecords
                                    : <>
                                        <ElementCardList search={search} elements={data} editHandle={loadModal}/>
                                        <Pagination page={page} total={totalRecords} handleClick={handlePaginationClick} /> 
                                      </>
                                : <Loading />
                        }

                    </div>
                </div>
            </main>

            <ElementModal 
                name={formData.name}
                measureUnit={formData.measureUnit}
                price={formData.price}
                status={formData.status}
                handleChange={changeHandler}
                handleSubmit={updateSubmitHandler}
            />
 
        </>
    );
}

export default CostElement;