import React, {useState, useEffect} from 'react';
import config from '../Shared/config/general';
import { fetchData } from '../Shared/helpers/fetchHelper';
import Loading from '../Shared/Loading';
import EnterpriseItem from './EnterpriseItem';


export default function EnterpriseList({search}) {
 
    const [enterprises, setEnterprises] = useState(null);

    useEffect(() => {

        const getData = async () => {
            const url = config.apiUrl + 'enterprises';
            const result = await fetchData(url);

            if(result?.status !== 'success') {
                console.log(result);
            } else {
                setEnterprises(result.data);
            }
        }

        getData();

    }, [])

    return(
        <>
            {
                enterprises 
                    ?
                        enterprises.map(e => (
                            <EnterpriseItem enterprise={e} key={e._id}/>
                        ))
                    : <Loading />
            }
        </>
    )
    
}