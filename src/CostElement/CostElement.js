import React, { useState } from 'react';
import Header from '../Shared/Header';
import SearchBox from '../Shared/SearchBox';
import ElementCardList from './ElementCardList';
import ElementModal from './ElementModal';

const CostElement = () => {
    
    const [search, setSearch] = useState('');
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return(
        <>
            <Header />

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        <div className="row">
                            <div className="col">
                                <form action="#" method="get">
                                    <SearchBox 
                                        placeHolder="Buscar elementos" 
                                        handleChange={handleChange}
                                    />
                                </form>
                            </div>
                            <div className="" style={{width: "130px"}}>
                                <button type="submit" className="btn btn-primary w-100" data-bs-target="#editModal" data-bs-toggle="modal" > <i className="fa fa-plus"></i> Agregar</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col px-3 py-4">
                                <h4>Elementos de costo/gasto</h4>
                            </div>
                        </div>

                        <ElementCardList search={search} />

                    </div>
                </div>
            </main>

            <ElementModal />

        </>
    );
}

export default CostElement;