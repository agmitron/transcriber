import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export interface IUserData {
    token: string 
    userID: string
}

export const useAuth = () => {
    const [token, setToken] = useState<string>('')
    const [userID, setUserID] = useState<string>('')

    console.log({token, userID})

    const login = useCallback((jwtToken: string, id: string) => { 
        setToken(jwtToken)
        setUserID(id)

        localStorage.setItem(storageName, JSON.stringify({
            userID: id,
            token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken('')
        setUserID('')

        localStorage.removeItem(storageName)
        window.location.replace('/')
    }, [])

    useEffect(() => {
        try {
            const json = localStorage.getItem(storageName) || null
            
            if (!json) {
                throw new Error('Failed to login')
            }

            const data: IUserData = JSON.parse(json)

            if (data?.token) {
                login(data.token, data.userID)
            }

        } catch (e) {
            console.error(e)
        }
    }, [login])

    return { login , logout, token, userID }
}