import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../Shared/Header';
import EnterpriseForm from './EnterpriseForm';
import { fetchData } from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';
import Alert from '../Shared/Alert';
import logo from '../Shared/assets/img/logo_placeholder.jpg';

export default function AddEnterprise() {

    const [formData, setFormData] = useState(new FormData())
    const [error, setError] = useState('');
    const history = useHistory();

    function changeHandler(e) {

        if(e.target.type === 'file') {
            setFormData({...formData, [e.target.name]: e.target.files[0]});
        } else if(e.target.type === 'checkbox') {
            setFormData({...formData, [e.target.name]: e.target.checked});
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    async function submitHandler(e) {
        e.preventDefault();
        const htmlFormData = new FormData();

        for(let item in formData) {
            htmlFormData.append(item, formData[item]);
        }

        const url = config.apiUrl + 'enterprises';

        const result = await fetchData(url, 'POST', htmlFormData, false);

        if(result.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
            history.push('/enterprise');
        }
    }

    return(
        <>
            <Header active="Empresas"/>

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        
                        <h3 className="">Registro de empresa</h3>

                        <hr className="py-0"/>

                        {error &&
                            <Alert 
                                type="error" 
                                content={error} 
                                closeButton="true"
                                unSetError={setError}
                            />
                        }

                        <EnterpriseForm changeHandler={changeHandler} submitHandler={submitHandler} logo={logo}/>
                        
                    </div>
                </div>
            </main>
        </>
    )

}