import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SetPwdForm from './SetPwdForm';
import {fetchData} from '../Shared/helpers/fetchHelper';
import config from '../Shared/config/general';

export default function Login(props) {

    const [formData, setFormData] = useState({});
    const [linkError, setLinkError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setFormData({link: props.match.params.link});
        
        const verifyLink = async () => {
            const url = config.apiUrl + 'users/recoverpwd/' + props.match.params.link;
            const result = await fetchData(url, 'GET');

            if(result?.status !== 'success') {
                setLinkError(result?.errors[0]);
            } else {
                setLinkError(null);
            }
        }
        
        verifyLink();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        const url = config.apiUrl + 'users/setpwd';
        const result = await fetchData(url, 'POST', formData);

        if(result?.status !== 'success') {
            setPasswordError(result.errors[0]);
        } else {
            history.push('/login');
        }
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (

        <main className="bg-second mx-auto p-4" style={{maxWidth: "600px", marginTop: "100px"}}>
            <img src={require('../Shared/assets/img/logo.png').default} alt="" style={{float: "right",  width: "48px"}}/>
            {!linkError
                ? <SetPwdForm handleChange={handleChange} handleSubmit={handleSubmit} error={passwordError} />
                : <>
                    <h3>Ocurrieron errores</h3>
                    <h5 className="fw-light">Lo sentimos, por favor revise los errores que se muestran</h5>
                    <div className={`alert alert-danger p-2 mt-5` } role="alert">
                    { linkError }
                    </div>
                  </>
            }
        </main>

    )
}