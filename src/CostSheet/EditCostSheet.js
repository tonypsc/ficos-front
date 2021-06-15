import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../Shared/Header';
import Alert from '../Shared/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreatableSelect from 'react-select/creatable';
import ElementRow from './ElementRow';
import ElementForm from './ElementForm';
import config from '../Shared/config/general';
import {fetchData} from '../Shared/helpers/fetchHelper';
import swal from 'sweetalert';

const EditCostSheet = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [elementFormData, setElementFormData] = useState({})
    const [costSheet, setCostSheet] = useState({
            elements:[],
            _total: 0,
            _subTotal: 0,
            _salesTaxes: 0,
            _comercialMargin: 0,
            _imposedPrice: 0,
            minoristPrice: 0,
            owner: {_id: user._id, fullName: user.fullName, enterpriseName: user.enterpriseName},
            name: 'Nueva ficha de costo',
            photo: 'nada'
        });
    
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalErorr, setModalError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState(null);
    const [elementNames, setElementNames] = useState(null);
    const [elements, setElements] = useState(null);

    const [caption, setCaption] = useState('Nueva ficha de costo');
    const location = useLocation();

    const _id = new URLSearchParams(location.search).get('_id');

    useEffect(() => {

        /**
         * Gets costsheet data
         */
        const getCostSheetData = async ()=> {
            if(_id === 'new') return;

            const url = `${config.apiUrl}costsheets/${_id}`;
            const result = await fetchData(url);
    
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setCostSheet(result.data);
            }
        }
        
        getCostSheetData();
        
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

        /**
         * Gets the list of measure units
         */
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

        /**
         * Gets the list of element names
         */
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

        /**
         * Gets the list of element names
         */
         const getElements = async () => {
            const url = `${config.apiUrl}elements`;
   
            const result = await fetchData(url);
    
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setElements(result.data.elements);
            }
        }

        getElements();

        /**
         * Gets default comercialMargin and salesTaxes
         */
         const getDefaults = async () => {
            const url = `${config.apiUrl}enterprises/${JSON.parse(localStorage.getItem('user')).enterpriseId}`;
   
            const result = await fetchData(url);
           
            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setCostSheet({...costSheet, comercialMargin: result.data.comercialMargin, salesTaxes: result.data.salesTaxes});
            }
        }

        getDefaults();

    }, [])
    
    /**
     * Shows and hides elements modal
     * @param {element data} data 
     */
    const handleShowModal = (data) => {
        setElementFormData(data);
        setModalError(null);
        setShowModal(true);
    }

    /**
     * Closes elements mdal
     */
    const handleCloseModal = () =>  setShowModal(false);
    
    /**
     * Handles de onchange in controls of the elements modal
     * @param {event} e 
     */
    const handleElementChange = (e) => {
        let editElementFormData = elementFormData;
        if(e.target.type === 'checkbox') {
            editElementFormData = {...elementFormData, [e.target.name]: e.target.checked};
        } else if(e.target.type === 'number') {
            let value = e.target.value ? e.target.value : 0;
            editElementFormData = {...elementFormData, [e.target.name]: value};
        } else {
            editElementFormData = {...elementFormData, [e.target.name]: e.target.value};
        }

        editElementFormData.amount = (editElementFormData.price * editElementFormData.qty).toFixed(2);
        
        setElementFormData(editElementFormData);
    };

    /**
     * Handles submit of elements modal
     * @param {event} e 
     */
    const handleElementSubmit = (e) => {
        e.preventDefault();
        let editCostSheet = {...costSheet};
        let elementData = elementFormData;

        // Check ammount
        if(elementFormData.amount <= 0) {
            setModalError('El importe debe ser mayor que 0.');
            return;
        }

        // Check duplicated elements
        if(editCostSheet.elements.find(el => (el.name === elementData.name && el._id !== elementData._id))) {
            setModalError('El elemento seleccionado ya está incluido en la ficha de costo.');
            return;
        }

        if(elementData._id === null) {
            if(!editCostSheet.elements)
                editCostSheet.elements=[];
            
            elementData._id = Date.now();
            editCostSheet.elements.push(elementData);
        } else {
            const elementIndex = editCostSheet.elements.findIndex(el=>el._id === elementData._id);
            if(elementIndex !== -1)
                editCostSheet.elements[elementIndex] = elementData;
        }

        editCostSheet = calculateCostSheet(editCostSheet);

        setCostSheet(editCostSheet);
        setShowModal(false);
    };

    const handleElementSelect = (e) => {
        let editElementFormData = {...elementFormData, name: e.value.name, measureUnit: e.value.measureUnit, price: e.value.price};
        editElementFormData.amount = (editElementFormData.price * editElementFormData.qty).toFixed(2);
        setElementFormData(editElementFormData);
    }

    const handleElementDelete = (_id) => {
        
        swal({
            title: "¿Esta seguro que desea eliminar este elemento?",
            text: "¡Una vez eliminado no podrá ser recuperado!",
            icon: "warning",
            buttons: ['Cancelar', 'Eliminar'],
            dangerMode: true,       
        })
        .then(async (ok) => {
            if(!ok) return;
            
            let editCostSheet = costSheet;
            const elementIndex = editCostSheet.elements.findIndex(el=>el._id === _id);
            
            if(elementIndex !== -1)
                editCostSheet.elements.splice(elementIndex, 1);
    
            editCostSheet = calculateCostSheet(editCostSheet);
            setCostSheet({...costSheet, editCostSheet});
        })
    }

    /**
     * Handles onchange on costsheet controls
     * @param {event} e 
     */
    const handleCostSheetChange = (e) => {
        let editCostSheet = {};
        
        if(e.target) { // All input but categories select
            let value = e.target.value;
            if(e.target.type === 'number')             
                value = e.target.value ? e.target.value : 0;

            editCostSheet = {...costSheet, [e.target.name]: value};
            editCostSheet = calculateCostSheet(editCostSheet);
        } else { // Categories select
            let categories = e.map(el => el.value);
            editCostSheet = {...costSheet, categories: categories};
        }

        setCostSheet(editCostSheet);
    }
    
    /**
     * Calculates the fields in  the costSheet
     * @param {costSheet} editCostSheet 
     * @returns calculated costSheet
     */
    const calculateCostSheet = (editCostSheet) => {
        let total = Number(0);

        for(let el of editCostSheet.elements) {
            total += parseFloat(el.amount);
        }

        editCostSheet._total = parseFloat(total.toFixed(2));
        editCostSheet._comercialMargin = parseFloat((editCostSheet.comercialMargin * total / 100).toFixed(2));
        editCostSheet._subTotal = parseFloat((total + editCostSheet._comercialMargin).toFixed(2));
        editCostSheet._salesTaxes = parseFloat(((total + editCostSheet._comercialMargin) * editCostSheet.salesTaxes / 100).toFixed(2));
        editCostSheet._imposedPrice = parseFloat((total + editCostSheet._comercialMargin + editCostSheet._salesTaxes).toFixed(2));
        //editCostSheet.minoristPrice = editCostSheet._imposedPrice;
        return editCostSheet;
    }

    /**
     * Handles the submit event of the costsheet
     * @param {event} e 
     */
    const handleCostSheetSubmit = async (e) => {
        e.preventDefault();
        
        if(!costSheet.categories || costSheet.categories.length === 0) {
            setError('Por favor seleccione al menos una categoría.');
            return;
        }

        if(costSheet._imposedPrice <= 0){
            setError('Revise... el importe de la ficha de costo no puede ser cero.');
            return;
        }

        if(!costSheet.minoristPrice || costSheet.minoristPrice <= 0) {
            setError('Revise... el precio minorista debe ser mayor que cero.');
            return;
        }

        const url = `${config.apiUrl}costsheets`;
        const method = _id==='new' ? 'POST' : 'PATCH';
        
        const result = await fetchData(url, method, costSheet);

        console.log(result);

        if(result?.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
            //setCostSheet(result.data);
        }
    }

    return(
        <>
            <Header active="Fichas de costo"/>

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">

                        {error &&
                            <Alert 
                                type="danger" 
                                content={error} 
                                closeButton="true"
                                unSetError={setError}
                            />
                        } 

                        <Form onSubmit={handleCostSheetSubmit}>
                            <Row>
                                <Col xs={8}>
                                    {/* <h2>{_id==='new' ? 'Nueva ficha de costo' : 'Editando ficha de costo'}</h2> */}
                                    <h2>{costSheet.name}</h2>
                                </Col>
                                <Col xs={4} className="text-end" >

                                {/* Costsheet image */}
                                <Dropdown alignRight={true}>
                                    <Dropdown.Toggle id="dropdown-basic" as={Image} src={require('../Shared/assets/img/Frame.png').default} style={{width: "64px", height: "auto"}} className="mask cursor-pointer">
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item ><img src={require('../Shared/assets/img/sheeticons/hamburg.png').default} style={{width: "56px", height: "auto"}} /></Dropdown.Item>
                                        <Dropdown.Item href="#/action-1"><img src={require('../Shared/assets/img/sheeticons/fries.png').default} style={{width: "56px", height: "auto"}} /></Dropdown.Item>
                                        <Dropdown.Item href="#/action-1"><img src={require('../Shared/assets/img/sheeticons/hotdog.png').default} style={{width: "56px", height: "auto"}} /></Dropdown.Item>
                                        <Dropdown.Item href="#/action-1"><img src={require('../Shared/assets/img/sheeticons/donut.png').default} style={{width: "56px", height: "auto"}} /></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                </Col>
                            </Row>

                            {/* Main fields */}
                            <Row className="mt-3">
                                <Col xs={6} className="m-0">
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control 
                                            name="name" 
                                            type="text" 
                                            autoFocus 
                                            required 
                                            maxLength="200"
                                            onChange={handleCostSheetChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={3} className="m-0 p-0">
                                    <Form.Group>
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control 
                                            name="qty" 
                                            type="number" 
                                            required 
                                            min="0" 
                                            onChange={handleCostSheetChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={3} className="">
                                    <Form.Group>
                                        <Form.Label>UM</Form.Label>
                                        <Form.Control 
                                            name="measureUnit" 
                                            type="text" 
                                            list="units" 
                                            required 
                                            onChange={handleCostSheetChange}
                                        />
                                        <datalist id="units">
                                            { units &&
                                                units.map(u => <option value={u.name} key={u._id} />)
                                            }
                                        </datalist>                        
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Category select */}
                            <Row className="mt-3">
                                <Col xs={12} className="inline-group">
                                    <CreatableSelect
                                            isClearable
                                            isMulti
                                            placeholder="Para agregar, escriba el nombre y presione Enter"
                                            className="w-100"
                                            options={categories.map(cat => ({value: cat.name, label: cat.name}))}
                                            onChange={handleCostSheetChange}
                                    />
                                </Col>
                            </Row>

                            {/* Table header */}
                            <Row className="mt-3 bg-second text-secondary m-0" >
                                <Col xs={5} className="element-header py-1 table-header rounded-start">
                                    Elemento
                                </Col>
                                <Col className="table-header text-center py-1">
                                    UM
                                </Col>
                                <Col className="text-end table-header py-1">
                                    Norma
                                </Col>
                                <Col className="text-end table-header py-1">
                                    Precio
                                </Col>
                                <Col className="text-end table-header py-1 rounded-end">
                                    Importe
                                </Col>
                            </Row>

                            {/* Element list */}
                            {costSheet?.elements &&
                                costSheet.elements.map((el, index) => 
                                    <ElementRow
                                        elementData={el}
                                        key={index}
                                        handleEdit={handleShowModal}
                                        handleDelete={handleElementDelete}
                                     />
                                )
                            }
                            
                            {/* Add element button */}
                            <Row className="mx-1 mt-3">
                                <Col className="text-end pe-0">
                                    <button 
                                        type="button" 
                                        className="btn btn-primary px-4 me-0" 
                                        onClick={() => handleShowModal({
                                            _id: null, 
                                            status: true, 
                                            price: 0, 
                                            qty: 0,
                                            amount: 0
                                        })}
                                    > 
                                        <i className="fa fa-plus" title="Agregar"></i>
                                    </button>
                                </Col>
                            </Row>

                            <hr className="mx-1" />

                            {/* Table footer */}
                            <Row className="mx-1 fw-bold">
                                <Col xs={9}>
                                    Total
                                </Col>
                                <Col xs={3} className="text-end m-0 py-1">
                                    {costSheet._total.toFixed(2)}
                                </Col>
                            </Row>
                            <Row className="mx-1 fw-bold">
                                <Col xs={9}>
                                    Margen comercial
                                    <input 
                                        type="text" 
                                        name="comercialMargin" 
                                        id="comercialMargin" 
                                        className="costsheet-footer-input ms-1" 
                                        defaultValue={costSheet.comercialMargin} 
                                        onChange={handleCostSheetChange}
                                    /> %
                                </Col>
                                <Col xs={3} className="text-end m-0 py-1">
                                    {costSheet._comercialMargin.toFixed(2)}
                                </Col>
                            </Row>
                            <Row className="mx-1 fw-bold">
                                <Col xs={9}>
                                    Subtotal
                                </Col>
                                <Col xs={3} className="text-end m-0 py-1">
                                    {costSheet._subTotal.toFixed(2)}
                                </Col>
                            </Row>
                            <Row className="mx-1 fw-bold">
                                <Col xs={9}>
                                    Impuesto s.ventas
                                    <input 
                                        type="text" 
                                        name="salesTaxes" 
                                        id="salesTaxes" 
                                        className="costsheet-footer-input ms-1" 
                                        defaultValue={costSheet.salesTaxes} 
                                        onChange={handleCostSheetChange}
                                    /> %
                                </Col>
                                <Col xs={3} className="text-end m-0 py-1">
                                    {costSheet._salesTaxes.toFixed(2)}
                                </Col>
                            </Row>
                            <Row className="mx-1 fw-bold">
                                <Col xs={9}>
                                    Precio impuesto
                                </Col>
                                <Col xs={3} className="text-end m-0 py-1">
                                    {costSheet._imposedPrice.toFixed(2)}
                                </Col>
                            </Row>
                            <Row className="mx-1 fw-bold">
                                <Col xs={9}>
                                    Precio minorista
                                </Col>
                                <Col xs={3} className="text-end m-0 py-1">
                                    <input 
                                        type="text" 
                                        name="minoristPrice" 
                                        id="minoristPrice" 
                                        className="text-end w-100"
                                        style={{maxWidth: "150px"}}
                                        value={costSheet.minoristPrice}
                                        onChange={handleCostSheetChange}
                                    />
                                </Col>
                            </Row>

                            {/* Buttons */}
                            <Row className="mx-1 mt-3">
                                <Col xs={12}>
                                    <button 
                                        type="submit"
                                        className="btn btn-success px-3 me-2"
                                        disabled = {user._id !== costSheet.owner?._id}
                                    > 
                                        <i className="fa fa-save"></i><span className="shorten"> Guardar</span> 
                                    </button>

                                    <button type="button" className="btn btn-primary px-3 me-2"> <i className="fa fa-print"></i> <span className="shorten"> Imprimir</span> </button>
                                    
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary px-3" 
                                        data-id={'_new'}
                                    > 
                                        <i className="fa fa-paste"></i> <span className="shorten">Crear copia</span> 
                                    </button>
                                </Col>
                            </Row>

                        </Form>

                        {/* Elements modal */}
                        <ElementForm 
                            formData={elementFormData}
                            showModal={showModal}
                            modalError={modalErorr}
                            units={units}
                            elementNames={elementNames}
                            elements={elements}
                            handleCloseModal={handleCloseModal}
                            handleElementSubmit={handleElementSubmit}
                            handleElementChange={handleElementChange}
                            handleElementSelect={handleElementSelect}
                        />

                    </div>
                </div>
            </main>
        </>
    )
}

export default EditCostSheet;