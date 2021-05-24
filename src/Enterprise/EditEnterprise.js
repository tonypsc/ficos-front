import React, { useState, useEffect } from 'react';
import EnterpriseForm from './EnterpriseForm';
import { fetchData } from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';
import Alert from '../Shared/Alert';
import dateHelper from '../Shared/helpers/dateHelper';

export default function EditEnterprise({id}) {

    const [formData, setFormData] = useState({})
    const [itemData, setItemData] = useState({});
    const [error, setError] = useState('');

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
            
            htmlFormData.append('_id', id);

            for(let item in formData) {
                htmlFormData.append(item, formData[item]);
            }
    
            const url = config.apiUrl + 'enterprises';
            const result = await fetchData(url, 'PATCH', htmlFormData, false);
    
            if(result.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
            }
        } else {
        }
    }

    useEffect(() => {
        async function getData() {
            const url = `${config.apiUrl}enterprises/${id}`;
            const result = await fetchData(url, 'GET');

console.log(url);

            if(result.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setItemData({...result.data, logoUrl: `${config.apiUrl}uploads/${result.data.logo}`, expireDate: dateHelper.getDateFromUts(result.data.expireDate, 'y-m-d')});
            }
        }

        getData();

    },[])

    return(
        <>
            <h3 className="">Edición de empresa</h3>

            <hr className="py-0"/>

            {error &&
                <Alert 
                    type="error" 
                    content={error} 
                    closeButton="true"
                    unSetError={setError}
                />
            }

            <EnterpriseForm 
                changeHandler={changeHandler} 
                submitHandler={submitHandler} 
                logo={itemData.logoUrl} 
                name={itemData.name} 
                expireDate={itemData.expireDate}
                status={itemData.status}
            />
            
        </>
    )

}