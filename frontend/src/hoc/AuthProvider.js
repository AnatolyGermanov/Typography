import { createContext, useEffect, useState } from 'react'
import instance from '../utils/axios/instance'

export const AuthContext = createContext(null)

function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getUser = async () => {
        const auth_token = localStorage.getItem('auth_token')

        try {
            if (auth_token) {
                setLoading(true);
                const res = await instance.get('api/v1/auth/users/me/', {
                    headers: {
                        Authorization: `Token ${auth_token}`
                    }
                })

                const userId = res.data.id
        
                const response = await instance.get(`api/v1/stafflist/${userId}/`, {
                    headers: {
                        Authorization: `Token ${auth_token}`
                    }
                })
        
                setUser(response.data)
            }
            else
                setUser(null)
          }
          catch (error) {
            console.log('Недопустимый токен')
          }
          finally {
            setLoading(false)
          }
    }

    useEffect(() => {
        getUser()
    }, [])

    const value = {user, getUser, loading}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider