import { get, post } from '../../fetch';

export default function (data, url, method = 'get') {
  let fetch = (method === 'post') ? post : get;
  return fetch(url, data, 'json').then((resp) => {
    const { code, data } = resp;
    return data;
  });
}
