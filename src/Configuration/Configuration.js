import React, { useState, useEffect } from 'react';
import Header from '../Shared/Header';
import {fetchData} from '../Shared/helpers/fetchHelper';
import dateHelper from '../Shared/helpers/dateHelper';
import config from '../Shared/config/general';
import ConfigurationForm from './ConfigurationForm';
import Alert from '../Shared/Alert';

const Configuration = props => {

    const [formData, setFormData] = useState(null);
    const [error, setError] = useState();
    const [success, setSuccess] = useState('')

    const enterpriseId = JSON.parse(localStorage.getItem('user')).enterpriseId;

    useEffect(() => {
        async function getData() {
            const url = `${config.apiUrl}enterprises/${enterpriseId}`;
            const result = await fetchData(url, 'GET');

            if(result.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setFormData(
                    {
                        ...result.data, 
                        logoUrl: `${config.apiUrl}uploads/${result.data.logo}`, 
                        expireDate: dateHelper.getDateFromUts(result.data.expireDate, 'y-m-d'),
                        daysLeft: dateHelper.getDaysLeft(result.data.expireDate)
                    }
                );
            }
        }

        getData();
    }, [])

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

        if(Object.keys(formData).length !== 0) {
            
            for(let item in formData) {
                htmlFormData.append(item, formData[item]);
            }
    
            const url = config.apiUrl + 'enterprises';
            const result = await fetchData(url, 'PATCH', htmlFormData, false);
    
            if(result.status !== 'success') {
                setSuccess(null);
                setError(result.errors);
            } else {
                setError(null);
                setSuccess('Se ha actualizado la información correctamente');
            }
        } 
    }

    return(
        <>
            <Header active="Configuración" />

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        
                        <h3 className="mb-4">Configuración del sistema</h3>

                        {error &&
                            <Alert 
                                type="danger" 
                                content={error} 
                                closeButton="true"
                                unSetError={setError}
                            />
                        }
                        {success &&
                            <Alert 
                                type="success" 
                                content={success} 
                                closeButton="true"
                                unSetError={setSuccess}
                            />
                        }
                        {formData &&
                            <ConfigurationForm 
                                name={formData.name}
                                logo={formData.logoUrl}
                                expireDate={formData.expireDate}
                                daysLeft={formData.daysLeft}
                                limitPrice={formData.limitPrice}
                                newSheetsPublic={formData.newSheetsPublic}
                                changeHandler={changeHandler}
                                submitHandler={submitHandler}
                            />
                        }
                    </div>
                </div>
            </main>    
        </>
    )
}

export default Configuration;