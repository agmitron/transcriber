import ejwt from 'express-jwt'
import { Request } from 'express'
import config from 'config'

export type ProjectUploadData = {
    email: string
    title: string
    file: File
    text: string
    engine_and_lang: string
}

export const getTokenFromBearer = (bearerString: string) => bearerString.split(' ')[1]

export const TOKEN_PROPERTY = 'user'

export const getJWTfromRequest = (request: Request): IJWTTokenPayload => (request as any)[TOKEN_PROPERTY]
interface IJWTTokenPayload {
    userID: string
    iat: number
    exp: number
}
export interface IProtectedRequest extends Request {
    [TOKEN_PROPERTY]: IJWTTokenPayload
}

export const authMiddleware = ejwt({
    secret: config.get('jwtSecret'),
    getToken(req) {
        const bearer =
            req.headers.authorization?.split(' ')[0] === 'Bearer'
                ? req.headers.authorization?.split(' ')[1]
                : false
                
        if (bearer) {
            return bearer
        }

        if (req.query?.token) {
            return req.query.token
        }

        return null
    },
    requestProperty: TOKEN_PROPERTY,
    algorithms: ['HS256']
})