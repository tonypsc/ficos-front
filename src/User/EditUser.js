import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Header from '../Shared/Header';
import UserForm from './UserForm';
import { fetchData } from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';
import Alert from '../Shared/Alert';
import Loading from '../Shared/Loading';
import ChangePwdForm from './ChangePwdForm';

export default function EditUser() {

    const [formData, setFormData] = useState({})
    const [error, setError] = useState('');
    const [user, setUser] = useState();
    const history = useHistory();
    const location = useLocation();

    const _id = new URLSearchParams(location.search).get('_id');

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
            }
        }

        getData();

        const getUser = async (_id) => {
            const url = config.apiUrl + 'users/' + _id;

            const result = await fetchData(url, 'GET');

            console.log(result);

            if(result.status !== 'success') {
                setError(result.errors);
            } else {
                setError(null);
                setUser({...result.data, photoUrl: `${config.apiUrl}uploads/${result.data.photo}`});
                setFormData({...result.data});
            }
        }

        getUser(_id);

    },[])


    async function submitHandler(e) {
        e.preventDefault();
        const htmlFormData = new FormData();

        setFormData({...formData, _id});

        for(let item in formData) {
            htmlFormData.append(item, formData[item]);
        }

        const url = config.apiUrl + 'users';

        const result = await fetchData(url, 'PATCH', htmlFormData, false);

        if(result.status !== 'success') {
            setError(result.errors);
        } else {
            setError(null);
            history.push('/user');
        }
    }

    async function passwordSubmitHandler(e) {
        e.preventDefault();
        let form = {_id, password: e.target.password.value, confirm: e.target.confirm.value};
        
        const url = config.apiUrl + 'users/newpwd';

        const result = await fetchData(url, 'POST', form);

        console.log(result);

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
                        
                        <h3 className="">Edición de usuario</h3> <span className="text-muted">({user?.fullName || ''})</span>

                        <hr className="py-0"/>

                        {error &&
                            <Alert 
                                type="error" 
                                content={error} 
                                closeButton="true"
                                unSetError={setError}
                            />
                        }

                        { enterprises && Object.keys(enterprises).length !== 0 && user
                            ?
                            <>

                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                            <i className="fa fa-user me-2"></i>
                                            Datos generales
                                        </a>
                                        <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                            <i className="fa fa-key me-2"></i>
                                            Cambiar contraseña
                                        </a>
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <UserForm 
                                            changeHandler={changeHandler} 
                                            submitHandler={submitHandler} 
                                            userName={user.userName}
                                            fullName={user.fullName}
                                            email={user.email}
                                            photo={user.photoUrl} 
                                            enterpriseId={user.enterpriseId}
                                            rol={user.rol}
                                            status={user.status}
                                            enterprises={enterprises}
                                        />
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <p className="mt-5 text-muted">A continuación proporcione la nueva contraseña y la confirmación, asegurese que sean iguales.</p>
                                        <ChangePwdForm 
                                            changeHandler={changeHandler}
                                            submitHandler={passwordSubmitHandler}
                                        />
                                    </div>
                                </div>
                            </>
                            : <Loading />
                        }
                        
                    </div>
                </div>
            </main>
        </>
    )
}