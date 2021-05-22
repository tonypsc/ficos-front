import React, {useState, useEffect} from 'react';
import config from '../Shared/config/general';
import { fetchData } from '../Shared/helpers/fetchHelper';
import Loading from '../Shared/Loading';
import EnterpriseItem from './EnterpriseItem';
import Alert from '../Shared/Alert';
import Pagination from '../Shared/Pagination';


export default function EnterpriseList({search}) {
 
    const [enterprises, setEnterprises] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const getData = async () => {
            const url = config.apiUrl + 'enterprises';
            const result = await fetchData(url);

            if(result?.status !== 'success') {
                setError(result.errors);
            } else {
                setEnterprises(result.data);
            }
        }

        getData();

    }, [])

    return(
        <>
            {
                error
                    ?   <Alert content={error} />
                    :   
                    enterprises 
                        ?
                            enterprises.map(e => (
                                <EnterpriseItem enterprise={e} key={e._id}/>
                            ))
                        : <Loading />
            }
        
            <Pagination page="1" total="10" url={config.apiUrl + 'enterprise'} />
        </>
    )
    
}