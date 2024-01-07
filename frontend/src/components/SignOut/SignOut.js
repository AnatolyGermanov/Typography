import React from 'react'

import styles from './SignOut.module.css'

import YellowButton from '../UI/YellowButton/YellowButton'

import useAuth from '../../hooks/useAuth'
import instance from '../../utils/axios/instance'

function SignOut() {
    const {user, getUser} = useAuth()

    const signOut = async () => {
        const auth_token = localStorage.getItem('auth_token')

        try {
            await instance.post('auth/token/logout/', undefined, {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            localStorage.removeItem('auth_token')
            getUser()
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className={styles.container}>
            <span>Вы вошли как <b>{user.last_name} {user.first_name[0]}.{user.patronymic && user.patronymic[0] + '.'}</b></span>
            <YellowButton onClick={signOut}>Выйти</YellowButton>
        </div>
    )
}

export default SignOut