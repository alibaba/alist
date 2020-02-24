import { post, get } from './fetch'
import { IListQueryOptions, IListFetchResponse } from './types'

export default function(queryPayload: IListQueryOptions) {
  const { data, url, method } = queryPayload
  const fetch = method === 'POST' ? post : get
  return fetch(url, data, 'json').then((resp: IListFetchResponse) => {
    const { code, data, message } = resp
    if ([0, 200, '0', '200'].indexOf(code) === -1) {
      throw new Error(message || 'System Error')
    } else {
      return data
    }
  })
}
