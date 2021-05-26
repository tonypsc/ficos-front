import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../Shared/Header';
import UserForm from './UserForm';
import { fetchData } from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';
import Alert from '../Shared/Alert';
import photo from '../Shared/assets/img/user_placeholder.png';
import Loading from '../Shared/Loading';

export default function AddUser() {

    const [formData, setFormData] = useState({rol:'user'})
    const [error, setError] = useState('');

    const history = useHistory();

    function changeHandler(e) {

        if(e.target.type === 'file') {
            setFormData({...formData, [e.target.name]: e.target.files[0]});
        } else if(e.target.type === 'checkbox') {
            setFormData({...formData, [e.target.name]: e.target.checked});
        } else if(e.target.name === 'enterpriseId') { 
            setFormData({...formData, [e.target.name]: e.target.value, enterpriseName: e.target.options[e.target.selectedIndex].text});
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    const [enterprises, setEnterprises] = useState({});

    useEffect(() => {
        const getData = async () => {
            const url = config.apiUrl + 'enterprises';

            const result = await fetchData(url, 'GET');
    
            if(result.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setEnterprises(result.data.enterprises);
                if(result.data.enterprises.length > 0)
                    setFormData({...formData, enterpriseId: result.data.enterprises[0]._id, enterpriseName: result.data.enterprises[0].name});
            }
        }

        getData();
    },[])


    async function submitHandler(e) {
        e.preventDefault();
        const htmlFormData = new FormData();

        for(let item in formData) {
            htmlFormData.append(item, formData[item]);
        }

        const url = config.apiUrl + 'users';

        const result = await fetchData(url, 'POST', htmlFormData, false);

        if(result.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
            history.push('/user');
        }
    }


    return(
        <>
            <Header active="Usuarios"/>

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        
                        <h3 className="">Registro de usuario</h3>

                        <hr className="py-0"/>

                        {error &&
                            <Alert 
                                type="error" 
                                content={error} 
                                closeButton="true"
                                unSetError={setError}
                            />
                        }

                        { enterprises && Object.keys(enterprises).length !== 0
                            ?
                            <UserForm 
                                changeHandler={changeHandler} 
                                submitHandler={submitHandler} 
                                photo={photo} 
                                status={true}
                                enterprises={enterprises}
                                />
                            : <Loading />
                        }
                        
                    </div>
                </div>
            </main>
        </>
    )
}