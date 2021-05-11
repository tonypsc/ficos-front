import React from 'react';
import Header from '../Shared/Header';
import SearchBox from '../Shared/SearchBox';
import EnterpriseList from './EnterpriseList';

export default function Enterprises() {
    return(
        <>
            <Header active="Empresas" />

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        
                        <div className="row">
                            <div className="col">
                                <form action="#" method="get">
                                    <SearchBox 
                                        placeHolder="Buscar empresass" 
                                        // handleChange={handleChange}
                                    />
                                </form>
                            </div>
                            <div className="" style={{width: "130px"}}>
                                <button type="submit" className="btn btn-primary w-100"> <i className="fa fa-plus"></i> Agregar</button>
                            </div>
                        </div>

                        {/* title */}
                        <div className="row">
                            <div className="col px-3 py-4">
                                <h4>Empresas registradas</h4>
                            </div>
                        </div>

                        {/* enterprise list */}
                        <EnterpriseList />

                    </div>
                </div>

            </main>
        </>
    )    
}