import React, { useState } from 'react';
import FilterSet from '../Shared/FilterSet';
import Header from '../Shared/Header';
import SearchBox from '../Shared/SearchBox';
import CostSheetCard from './CostSheetCard';
import CostSheetCardList from './CostSheetCardList';

const CostSheet = () => {
    
    const [search, setSearch] = useState('');
    
    const handleChange = (e) => {
        setSearch(e.target.value);
        //console.log(search);
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
                                <button type="submit" className="btn btn-primary w-100"> <i className="fa fa-plus"></i> Agregar</button>
                            </div>
                        </div>
                    
                        {/* cards */}
                        <CostSheetCardList search={search} />

                    </div>
                </div>
            </main>
        </>
    )
}

export default CostSheet;
