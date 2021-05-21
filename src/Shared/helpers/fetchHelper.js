export async function fetchData (url, method = 'GET', body = null, appJson = true) {
    const token = localStorage.getItem('token');
    try {
        const options = {
            method,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body
        }

        if(appJson) {
            options.headers['Content-Type'] = 'application/json';
            if(body) options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);

        return await res.json();
    } catch (err) {
        return {status: 'error', errors: err};
        //return {status: 'error', errors: ['Ocurrieron errores al procesar la petición.']};
    }

}