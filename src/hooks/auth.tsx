import 
    React, 
    { 
        createContext, 
        ReactNode, 
        useContext,
        useState
    } 
from 'react'

import * as AuthSession from 'expo-auth-session'

import {
    SCOPE,
    CLIENT_ID,
    CDN_IMAGE,
    REDIRECT_URI,
    RESPONSE_TYPE
} from '../config'

import { api } from '../services/api'

type User = {
    id: string
    username: string
    firstName: string
    avatar: string
    email: string
    token: string
}

type AuthContextData = {
    user: User,
    loading: boolean,
    singIn: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

type AthorizationResponse = AuthSession.AuthSessionResult &{
    params: {
        access_token: string
    }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)

    async function singIn() {
        try {
            setLoading(true)

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
            const { type, params } = await AuthSession
            .startAsync({ authUrl }) as AthorizationResponse

            if( type === 'success' ){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`

                const userInfo = await api.get('/users/@me')
                userInfo.data.avatar =  `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
                const firstName = userInfo.data.username.split(' ')[0]

                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                })

                setLoading(false)
            }
            else{
                setLoading(false)
            }

        } catch (error) {
            throw new Error('Não foi possivel autenticar')
        }
    }

    return(
        <AuthContext.Provider value={{
            user,
            loading,
            singIn
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export {
    AuthProvider,
    useAuth
}