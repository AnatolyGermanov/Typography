import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import instance from '../../utils/axios/instance'

import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import Form from '../UI/Form/Form'
import YellowButton from '../UI/YellowButton/YellowButton'
import useAuth from '../../hooks/useAuth'

function SignOn() {
    const navigate = useNavigate()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const {user, getUser} = useAuth()

    useEffect(() => {
        if (user) {
            navigate('/clients')
        }
    }, [user])

    const signOn = async (e) => {
        e.preventDefault()

        try {
            const res = await instance.post('auth/token/login/', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })

            localStorage.setItem('auth_token', res.data.auth_token)
            getUser()
        }
        catch (error) {
            console.log(error)
        }
    }

  return (
    <Form onSubmit={signOn}>
        <div className='verContainer'>
            <Label htmlFor='username'>Имя пользователя</Label>
            <Input id='username' type='text' placeholder='Имя пользователя' required autoComplete='username' ref={usernameRef} />
        </div>
        <div className='verContainer'>
            <Label htmlFor='password'>Пароль</Label>
            <Input id='password' type='password' placeholder='Пароль' required autoComplete='current-password' ref={passwordRef} />
        </div>
        <YellowButton type='submit' >Войти</YellowButton>
    </Form>
  )
}

export default SignOn