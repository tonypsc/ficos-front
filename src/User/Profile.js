import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../Shared/Header';
import ProfileForm from './ProfileForm';
import { fetchData } from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';
import Alert from '../Shared/Alert';
import ChangePwdForm from './ChangePwdForm';

export default function Profile() {

    const storagedUser = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState(storagedUser)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const [user, setUser] = useState({...storagedUser, photoUrl: `${config.apiUrl}uploads/${storagedUser.photo}`});

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

        setFormData({...formData, _id: user._id});

        for(let item in formData) {
            htmlFormData.append(item, formData[item]);
        }

        const url = config.apiUrl + 'users';

        const result = await fetchData(url, 'PATCH', htmlFormData, false);

        if(result.status !== 'success') {
            setSuccess(null);
            setError(result.errors);
        } else {
            setError(null);
            setSuccess('Se ha actualizado la información correctamente');
            localStorage.setItem('user', JSON.stringify(result.data));
        }
    }

    async function passwordSubmitHandler(e) {
        e.preventDefault();
        let form = {_id: user._id, password: e.target.password.value, confirm: e.target.confirm.value};
        
        const url = config.apiUrl + 'users/newpwd';

        const result = await fetchData(url, 'POST', form);

        console.log(result);

        if(result.status !== 'success') {
            setError(result.errors);
            setSuccess(null);
        } else {
            setError(null);
            setSuccess('Se ha cambiado la contraseña correctamente');
        }
    }

    return(
        <>
            <Header active="Usuarios"/>

            <main className="container-xxl">
                <div className="row">
                    <div className="col p-4">
                        
                        <h3 className="mb-1">Perfil de usuario</h3> <span className="text-muted">({user?.userName || ''})</span>
                        <p className="mb-3"></p>

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

                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                    <i className="fa fa-user me-2"></i>
                                    Datos generales
                                </a>
                                <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                    <i className="fa fa-key me-2"></i>
                                    Contraseña
                                </a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <ProfileForm 
                                    changeHandler={changeHandler} 
                                    submitHandler={submitHandler} 
                                    fullName={user.fullName}
                                    email={user.email}
                                    photo={user.photoUrl} 
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
                        
                    </div>
                </div>
            </main>
        </>
    )
}