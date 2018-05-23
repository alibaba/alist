const noop = () => {};


const getCookies = () => {
    let cookieMap = {};
    const cookies = document.cookie;
    const cookiesArr = cookies.split(';');
    cookiesArr.forEach((item) => {
        const [key, val] = item.split('=');
        cookieMap[key] = val;
    });

    return cookieMap; 
};

const getCSRFToken = () => {
    const cookies = getCookies();
    return cookies['csrfToken'];
};

export default class FetchHandler {
    static Request (url, props) {
        const { json = null, onError = noop } = props || {};
        const csrfToken = getCSRFToken();
        
        let queryOpts = {};
        if (json) queryOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken
            },
            body: JSON.stringify(json)
        };

        return new Promise(async (resolve, reject) => {
            const resp = await fetch(url, queryOpts).catch((e) => {
                onError && onError(e);
                reject(e);
            });

            const contentType = resp.headers.get('Content-Type');            

            let result;
            if (contentType.indexOf('json') !== -1) {
                result = await resp.json();
            } else if (contentType.indexOf('text/plain') !== -1) {
                result = await resp.text();
            } else if (contentType.indexOf('html') !== -1) {
                const errmsg = '请求异常';
                onError && onError(errmsg);
                reject(errmsg);
            } else {
                result = await resp.text();
            }

            resolve(result);
        });
    }
}
