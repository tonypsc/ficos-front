import React, { useState, useEffect, useRef } from 'react';
import Header from '../Shared/Header';
import SearchBox from '../Shared/SearchBox';
import ElementCardList from './ElementCardList';
import config from '../Shared/config/general';
import {fetchData} from '../Shared/helpers/fetchHelper';
import Loading from '../Shared/Loading';
import Alert from '../Shared/Alert';
import Pagination from '../Shared/Pagination';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

const CostElement = () => {
    
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null);
    const [searchTemp, setSearchTemp] = useState('');
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [modalCaption, setModalCaption] = useState('Nuevo elemento');
    const [modalErorr, setModalError] = useState(null);

    const [units, setUnits] = useState(null);
    const [elementNames, setElementNames] = useState(null);

    const getData = async () => {
        const url = `${config.apiUrl}elements?search=${search}&page=${page}&limit=${config.itemsPerPage}`;
        
        const result = await fetchData(url);

        if(result?.status !== 'success') {
            setError(result.errors);
        } else {
            setTotalRecords(result.data.total);
            setData(result.data.elements);
        }
    }

    useEffect(()=> {
        getData();
    },[search, page])    

    useEffect(() => {
        const getUnits = async () => {
            const url = `${config.apiUrl}measureunits`;
            const result = await fetchData(url);
    
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setUnits(result.data.items);
            }
        }

        getUnits();

        const getElementNames = async () => {
            const url = `${config.apiUrl}elements/names`;
   
            const result = await fetchData(url);
    
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setElementNames(result.data);
            }
        }

        getElementNames();

    }, [])


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

    function handleChange(e) {
        if(e.target.type === 'checkbox') {
            setFormData({...formData, [e.target.name]: e.target.checked});
        } else if(e.target.type === 'number') {
            let value = e.target.value ? e.target.value : 0;
            setFormData({...formData, [e.target.name]: value});
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const url = config.apiUrl + 'elements';
        const method = formData._id===null ? 'POST' : 'PATCH';

        const result = await fetchData(url, method, formData);
       
        if(result.status !== 'success') {
           setModalError(result.errors);
        } else {
           setModalError(null);
           handleCloseModal();
           getData();
        }

    }

    const handleShowModal = (data) => {
        setFormData(data);
        let caption = data._id ? 'Edición de elemento' : 'Nuevo elemento';
        setModalCaption(caption);
        setModalError(null);
        setShowModal(true);
    }

    const handleCloseModal = () =>  setShowModal(false);

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
            
            const url = `${config.apiUrl}elements/${e.target.dataset.id}`;

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
                                <button  
                                    type="button" 
                                    className="btn btn-primary w-100" 
                                    onClick={() => handleShowModal({_id: null, status: true, price: 0})}
                                >
                                    <i className="fa fa-plus me-2"></i> 
                                     Agregar
                                </button>
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
                                        <ElementCardList search={search} elements={data} editHandle={handleShowModal} deleteHandle={handleDelete}/>
                                        <Pagination page={page} total={totalRecords} handleClick={handlePaginationClick} /> 
                                      </>
                                : <Loading />
                        }

                    </div>
                </div>
            </main>

            <Modal show={showModal} onHide={handleCloseModal} style={{top: "100px"}} >
                <Modal.Header>
                <Modal.Title>{modalCaption}</Modal.Title>
                <button type="button" className="btn-close" aria-hidden="true" onClick={handleCloseModal}></button>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                <Modal.Body>
                    { modalErorr &&
                        <Alert type="danger" content={modalErorr}/>
                    }
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre </label>
                        <input 
                            type="text" 
                            name="name"
                            list="elementnames" 
                            className="form-control" 
                            autoFocus
                            value={formData.name || ''}
                            onChange={handleChange}
                        />
                        <datalist id="elementnames">
                            { elementNames &&
                                    elementNames.map(e => <option value={e._id} key={e._id} />)
                            }
                        </datalist>                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="measure" className="form-label">UM</label>
                        <input 
                            type="text" 
                            name="measureUnit"
                            list="units" 
                            className="form-control" 
                            autoFocus
                            value={formData.measureUnit || ''}
                            onChange={handleChange}
                        />
                        <datalist id="units">
                            { units &&
                                units.map(u => <option value={u.name} key={u._id} />)
                            }
                        </datalist>                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Precio</label>
                        <input 
                            type="number" 
                            name="price" 
                            id="price" 
                            className="form-control" 
                            onChange={handleChange}
                            value={formData.price || '0'}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={formData.status}
                                id="status" 
                                name="status" 
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="status">
                            Activo
                            </label>
                        </div>                    
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} className="w-100">
                    <i className="fa fa-save me-2"></i>
                    Guardar cambios
                </Button>
                </Modal.Footer>
                </form>
            </Modal>        
        </>
    );
}

export default CostElement;