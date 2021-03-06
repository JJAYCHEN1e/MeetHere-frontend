import { baseUrl } from './env'
import store from '../store/index'

export default async (
  url = '',
  data = {},
  type = 'GET',
  token = store.state['token'],
  method = 'fetch'
) => {
  type = type.toUpperCase()
  url = baseUrl + url

  if (type == 'GET') {
    let dataStr = '' //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      // credentials: 'include',
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        TOKEN: token
      }
      // mode: "cors",
      // cache: "force-cache"
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
      console.log(requestConfig)
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  }
}
