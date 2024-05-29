import axios, { AxiosResponse } from 'axios'

export async function getMethod(url: string, params: any, token: any): Promise<AxiosResponse> {
  return await axios.get(`${url}`, {
    params,
    headers: {
      Authorization: token
    }
  })
}

export async function postMethod(url: string, payload: any, formData: any, token: any) {
  try {
    return await axios.post(`${url}`, payload, {
      headers: {
        Authorization: token,
        'Content-Type': formData ? 'multipart/form-data' : 'application/json'
      }
    })
  } catch (error) {
    return error
  }
}

export async function putMethod(url: string, payload: any, token: any) {
  try {
    return await axios.put(`${url}`, payload, {
      headers: {
        Authorization: `${token}`
      }
    })
  } catch (err) {
    return err
  }
}

export async function deleteMethod(url: string, token: any) {
  try {
    return await axios.delete(`${url}`, {
      headers: {
        Authorization: `${token}`
      }
    })
  } catch (err) {
    return err
  }
}
