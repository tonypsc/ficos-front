export async function fetchData (url, method, body) {
    let data = null;

    const token = sessionStorage.getItem('token');

    try {
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body)
         });

        return await res.json();
    } catch (err) {
        return {status: 'error', message: 'Ocurrieron errores al procesar la petición.'};
    }

}