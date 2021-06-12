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


const EditCostSheet = () => {
    
    const [elementFormData, setElementFormData] = useState({})
    const [costSheet, setCostSheet] = useState({
            elements:[],
            _total: 0,
            _subTotal: 0,
            _salesTaxes: 0,
            _comercialMargin: 0,
            _imposedPrice: 0,
            _minoristPrice: 0,
        });
    
    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalErorr, setModalError] = useState(null);

    const [units, setUnits] = useState(null);
    const [elementNames, setElementNames] = useState(null);

    //const [caption, setCaption] = useState('Nueva ficha de costo');
    const location = useLocation();

    const _id = new URLSearchParams(location.search).get('_id');

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

    // const history = useHistory();
    // const location = useLocation();
    
    const handleShowModal = (data) => {
        setElementFormData(data);
        setModalError(null);
        setShowModal(true);
    }

    const handleCloseModal = () =>  setShowModal(false);
    
    const handleElementChange = (e) => {
        if(e.target.type === 'checkbox') {
            setElementFormData({...elementFormData, [e.target.name]: e.target.checked});
        } else if(e.target.type === 'number') {
            let value = e.target.value ? e.target.value : 0;
            setElementFormData({...elementFormData, [e.target.name]: value});
        } else {
            setElementFormData({...elementFormData, [e.target.name]: e.target.value});
        }
    };

    const handleCostSheetChange = (e) => {
        let value = e.target.value;
        if(e.target.type === 'number')             
            value = e.target.value ? e.target.value : 0;

        let editCostSheet = {...costSheet, [e.target.name]: Number(value)};
        editCostSheet = calculateCostSheet(editCostSheet);

        setCostSheet(editCostSheet);
    }
    
    const handleElementSubmit = (e) => {
        e.preventDefault();
        let editCostSheet = costSheet;

        if(elementFormData._id === null) {
            if(!editCostSheet.elements)
                editCostSheet.elements=[];
            editCostSheet.elements.push(elementFormData);
        } else {
            const elementIndex = editCostSheet.elements.findIndex(el=>el._id === elementFormData._id);
            if(elementIndex !== -1)
            editCostSheet.elements[elementIndex] = elementFormData;
        }

        editCostSheet = calculateCostSheet(editCostSheet);

        setCostSheet(editCostSheet);
        setShowModal(false);
    };

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
        editCostSheet._minoristPrice = editCostSheet._imposedPrice;
        return editCostSheet;
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

                        <Form>
                            <Row>
                                <Col xs={8}>
                                    <h2>{_id==='new' ? 'Nueva ficha de costo' : 'Editando ficha de costo'}</h2>
                                </Col>
                                <Col xs={4} className="text-end" >

                                {/* Costsheet image */}
                                <Dropdown alignRight={true}>
                                    <Dropdown.Toggle id="dropdown-basic" as={Image} src={require('../Shared/assets/img/Frame.png').default} style={{width: "64px", height: "auto"}} className="mask cursor-pointer">
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1"><img src={require('../Shared/assets/img/Frame.png').default} style={{width: "56px", height: "auto"}} /></Dropdown.Item>
                                        <Dropdown.Item href="#/action-1"><img src={require('../Shared/assets/img/logo.png').default} style={{width: "56px", height: "auto"}} /></Dropdown.Item>
                                        <Dropdown.Item href="#/action-1"><img src={require('../Shared/assets/img/ficos.png').default} style={{width: "56px", height: "auto"}} /></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                </Col>
                            </Row>


                            {/* Main fields */}
                            <Row className="mt-3">
                                <Col xs={6} className="m-0">
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control name="name" type="text" autoFocus required maxLength="200"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={3} className="m-0 p-0">
                                    <Form.Group>
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control name="qty" type="number" required min="0" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3} className="">
                                    <Form.Group>
                                        <Form.Label>UM</Form.Label>
                                        <Form.Control name="measureUnit" type="text" list="units" required />
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
                                            options={[
                                                { value: 'chocolate', label: 'Chocolate' },
                                                { value: 'strawberry', label: 'Strawberry' },
                                                { value: 'vanilla', label: 'Vanilla' },                                            
                                            ]}
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
                                     />
                                )
                            }
                            
                            {/* Add element button */}
                            <Row className="mx-1 mt-3">
                                <Col className="text-end pe-0">
                                    <button type="button" className="btn btn-primary px-4 me-0" onClick={() => handleShowModal({_id: null, status: true})}> 
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
                                        name="salePrice" 
                                        id="salePrice" 
                                        className="text-end" 
                                        value={costSheet._minoristPrice.toFixed(2)}
                                    />
                                </Col>
                            </Row>

                            {/* Buttons */}
                            <Row className="mx-1 mt-3">
                                <Col xs={12}>
                                    <button className="btn btn-success px-3 me-2"> <i className="fa fa-save"></i><span className="shorten"> Guardar</span> </button>
                                    <button className="btn btn-primary px-3 me-2"> <i className="fa fa-print"></i> <span className="shorten"> Imprimir</span> </button>
                                    <button className="btn btn-secondary px-3"> <i className="fa fa-paste"></i> <span className="shorten">Duplicar</span> </button>
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
                            handleCloseModal={handleCloseModal}
                            handleElementSubmit={handleElementSubmit}
                            handleElementChange={handleElementChange}
                        />

                    </div>
                </div>
            </main>
        </>
    )
}

export default EditCostSheet;