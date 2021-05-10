import { useState, useEffect} from 'react';

export default function useFetch(url, method, body) {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {

        const getData = async (url) => {
            try {
                setIsPending(true);
                const res = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body
                 });
                
                if(!res.ok) {
                    throw {err: true, status: res.status, statusText: res.statusText ? res.statusText : 'Ocurrieron errores al procesar la petición.'};
                }

                let json = await res.json();
                setData(json);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setIsPending(false);
            }
        }

        getData(url);
        
        return {data, isPending, error};
    }, [url])

}