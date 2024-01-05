import React from 'react'

import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import Form from '../UI/Form/Form'
import YellowButton from '../UI/YellowButton/YellowButton'

function SignOn() {
  return (
    <Form>
        <div className='verContainer'>
            <Label htmlFor='username'>Имя пользователя</Label>
            <Input id='username' type='text' placeholder='Имя пользователя' required autoComplete='username' />
        </div>
        <div className='verContainer'>
            <Label htmlFor='password'>Пароль</Label>
            <Input id='password' type='password' placeholder='Пароль' required autoComplete='current-password' />
        </div>
        <YellowButton type='submit' >Войти</YellowButton>
    </Form>
  )
}

export default SignOn