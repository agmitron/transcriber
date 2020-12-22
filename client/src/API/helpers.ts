import store from '../store'

export interface IProject {
  name: string
  description: string
  file: File
}

export const getRequest = async (endpoint: string, isProtected = false) => {
  const headers = {
    Authorization: `Bearer ${store.getters.token}`,
  }

  const response = await fetch(endpoint, {
    headers: isProtected ? headers : {},
  })

  return await response.json()
}

export const postRequest = async (
  endpoint: string,
  isProtected = false,
  payload: Record<string, unknown> = {},
) => {
  const headers = {
    Authorization: `Bearer ${store.getters.token}`,
  }
  const response = await fetch(endpoint, {
    headers: isProtected ? headers : {},
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return await response.json()
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  userID: string
  email: string
}

export interface IRegisterRequest {
  name: string
  email: string
  password: string
}
