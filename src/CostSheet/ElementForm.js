import React, {useEffect, useRef} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from '../Shared/Alert';
import ReactSelect from 'react-select';

const ElementForm = ({showModal, modalError, formData, elements, elementNames, units, handleCloseModal, handleElementSubmit, handleElementChange, handleElementSelect}) => {

    const refFocus = useRef();

    return(
            <Modal show={showModal} onHide={handleCloseModal} style={{top: "100px"}} onEntered={() => refFocus.current.focus()} >
            <Modal.Header>
            <Modal.Title>Elemento</Modal.Title>
            <button type="button" className="btn-close" aria-hidden="true" onClick={handleCloseModal}></button>
            </Modal.Header>
            <form onSubmit={handleElementSubmit}>
            <Modal.Body>
                { modalError &&
                    <Alert type="danger" content={modalError} width="w-100"/>
                }
                <div className="mb-3">
                    <label htmlFor="select" className="form-label">Seleccionar </label>
                    <ReactSelect 
                        ref={refFocus}
                        name="_" 
                        onChange={handleElementSelect} 
                        options={ elements 
                                    ? elements.map(e => ({value: e, label: `${e.name} (${e.measureUnit}) - $${e.price}`}))
                                    : []
                        }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre </label>
                    <input 
                        type="text" 
                        name="name"
                        list="elementnames" 
                        className="form-control" 
                        value={formData.name || ''}
                        onChange={handleElementChange}
                        required
                        autoFocus={true}
                    />
                    <datalist id="elementnames">
                        { elementNames &&
                                elementNames.map(e => <option value={e.name} key={e._id} />)
                        }
                    </datalist>                        
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="measure" className="form-label">UM</label>
                            <input 
                                type="text" 
                                name="measureUnit"
                                list="units" 
                                className="form-control" 
                                autoFocus
                                value={formData.measureUnit || ''}
                                onChange={handleElementChange}
                                required
                            />
                            <datalist id="units">
                                { units &&
                                    units.map(u => <option value={u.name} key={u._id} />)
                                }
                            </datalist>                        
                        </div>    
                        <div className="col">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input 
                                type="number" 
                                name="price" 
                                id="price" 
                                className="form-control" 
                                onChange={handleElementChange}
                                value={formData.price}
                                required
                                max={Number.MAX_VALUE}
                                min="0.00001"
                                step="0.00001"
                                onFocus={(e)=> e.target.select()}
                            />
                        </div>    
                    </div>
                </div>
                <div className="mb-3">

                    <div className="row">
                        <div className="col">
                            <label htmlFor="qty" className="form-label">Cantidad</label>
                            <input 
                                type="number" 
                                name="qty" 
                                id="qty" 
                                className="form-control" 
                                onChange={handleElementChange}
                                value={formData.qty}
                                min="0.00001"
                                max={Number.MAX_VALUE}
                                step="0.00001"
                                required
                                onFocus={(e)=> e.target.select()}
                            />
                        </div>    
                        <div className="col">
                            <label htmlFor="amount" className="form-label">Importe</label>
                            <input 
                                type="number" 
                                name="amount" 
                                id="amount" 
                                className="form-control" 
                                onChange={handleElementChange}
                                value={formData.amount}
                                min="0.01"
                                step="0.01"
                                max={Number.MAX_VALUE}
                                required
                                disabled
                            />
                        </div>    
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" className="w-100" type="submit">
                <i className="fa fa-save me-2"></i>
                Guardar cambios
            </Button>
            </Modal.Footer>
            </form>
        </Modal>       
    )

}

export default ElementForm;