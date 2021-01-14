import { useState, useCallback, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useMessages } from '../context/MessagesContext'

const storageName = 'userData'

export interface IUserData {
    userID: string
    token: string
    message: string
}

interface IJWTDecodedToken {
    payload: {
        exp: number
        iat: number
    }
}

export const useAuth = () => {
    const [token, setToken] = useState<string>('')
    const [userID, setUserID] = useState<string>('')
    const [expiration, setExpiration] = useState<number | null>(null)

    const login = useCallback((jwtToken: string, id: string) => {
        try {
            setToken(jwtToken)
            setUserID(id)
            const { payload } = jwt.decode(jwtToken, { complete: true }) as IJWTDecodedToken
            setExpiration(payload.exp || null)
            localStorage.setItem(storageName, JSON.stringify({
                userID: id,
                token: jwtToken,
            }))

        } catch (e) {
            return console.error('Failed to login. Try again.')
        }
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

    const logout = useCallback(() => {
        setToken('')
        setUserID('')

        localStorage.removeItem(storageName)
        window.location.replace('/')
    }, [])

    const checkIsJWTExpired = useCallback(() => {
        try {
            const decodedToken = jwt.decode(token, { complete: true }) as IJWTDecodedToken
            const jwtExpired = (decodedToken.payload.exp * 1000) < Date.now()

            if (jwtExpired) {
                logout()
                return console.error('The session has expired. Login again.')
            }

            return false
        } catch (e) {

        }
    }, [token, logout])

    return { login, logout, token, userID, checkIsJWTExpired }
}