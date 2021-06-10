import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from '../Shared/Alert';

const ElementForm = ({showModal, modalError, formData, elementNames, units, handleCloseModal, handleElementSubmit, handleElementChange}) => {

    return(
            <Modal show={showModal} onHide={handleCloseModal} style={{top: "100px"}} >
            <Modal.Header>
            <Modal.Title>Elemento</Modal.Title>
            <button type="button" className="btn-close" aria-hidden="true" onClick={handleCloseModal}></button>
            </Modal.Header>
            <form onSubmit={handleElementSubmit}>
            <Modal.Body>
                { modalError &&
                    <Alert type="danger" content={modalError}/>
                }
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre </label>
                    <input 
                        type="text" 
                        name="name"
                        list="elementnames" 
                        className="form-control" 
                        autoFocus
                        defaultValue={formData.name || ''}
                        onChange={handleElementChange}
                    />
                    <datalist id="elementnames">
                        { elementNames &&
                                elementNames.map(e => <option value={e._id} key={e._id} />)
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
                                defaultValue={formData.measureUnit || ''}
                                onChange={handleElementChange}
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
                                defaultValue={formData.price}
                                min="0"
                                max={Number.MAX_VALUE}
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
                                defaultValue={formData.qty}
                                min="0"
                                max={Number.MAX_VALUE}
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
                                defaultValue={formData.amount}
                                min="0"
                                max={Number.MAX_VALUE}
                            />
                        </div>    
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleElementSubmit} className="w-100">
                <i className="fa fa-save me-2"></i>
                Guardar cambios
            </Button>
            </Modal.Footer>
            </form>
        </Modal>       
    )

}

export default ElementForm;