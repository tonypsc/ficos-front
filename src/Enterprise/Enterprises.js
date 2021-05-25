import React, { useState } from 'react';
import Header from '../Shared/Header';
import EnterpriseList from './EnterpriseList';
import Alert from '../Shared/Alert';
import EditEnterprise from './EditEnterprise';
import AddEnterprise from './AddEnterprise';

export default function Enterprises() {
    
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState('list');
    const [editId, setEditId] = useState(null);


    const getContent = ()=> {
        switch(mode) {
            case 'add':
                return(<AddEnterprise />);
            case 'edit':
                return(<EditEnterprise id={editId} />)
            default:
                return(<EnterpriseList setEditMode={handleEditMode} setAddMode={handleAddMode}/>)
        }
    }

    function handleEditMode(e) {
        console.log(e.target.dataset.id);
        setEditId(e.target.dataset.id);
        setMode('edit');
    }

    function handleAddMode(e) {
        setMode('add');
    }

    return(
        <>
            <Header active="Empresas" />

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        
                        {error
                            ?   <Alert content={error} />
                            :  getContent()
                        }  
                        
                    </div>
                </div>

            </main>
        </>
    )    
}