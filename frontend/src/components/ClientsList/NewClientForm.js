import React, { useRef } from 'react'

import Form from '../UI/Form/Form'
import Label from '../UI/Label/Label'
import Input from '../UI/Input/Input'
import CloseButton from '../UI/CloseButton/CloseButton'
import YellowButton from '../UI/YellowButton/YellowButton'
import instance from '../../utils/axios/instance'

function NewClientForm({getClients, setVisible}) {
    const first_nameRef = useRef()
    const last_nameRef = useRef()
    const patronymicRef = useRef()
    const phone_numberRef = useRef()
    const passport_detailsRef = useRef()

    const newClient = async (event) => {
        event.preventDefault()

        try {
            const auth_token = localStorage.getItem('auth_token')

            await instance.post('api/v1/clientlist/', {
                first_name: first_nameRef.current.value,
                last_name: last_nameRef.current.value,
                patronymic: patronymicRef.current.value,
                phone_number: phone_numberRef.current.value,
                passport_details: passport_detailsRef.current.value
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            getClients()

            setVisible(false)
        }
        catch (error) {
            
        }
    }

  return (
    <Form onSubmit={newClient}>
        <div className='horContainer'>
            <h3>Клиент (добавление)</h3>
            <CloseButton onClick={() => setVisible(false)} />
        </div>

        <div className='verContainer'>
            <Label htmlFor='first_name'>Фамилия</Label>
            <Input id='first_name' type='text' placeholder='Фамилия' required autoComplete='family-name' ref={first_nameRef} />
        </div>
        <div className='verContainer'>
            <Label htmlFor='last_name'>Имя</Label>
            <Input id='last_name' type='text' placeholder='Имя' required autoComplete='given-name' ref={last_nameRef}/>
        </div>
        <div className='verContainer'>
            <Label htmlFor='patronymic'>Отчество</Label>
            <Input id='patronymic' type='text' placeholder='Отчество' ref={patronymicRef}/>
        </div>
        <div className='verContainer'>
            <Label htmlFor='phone_number'>Номер телефона</Label>
            <Input id='phone_number' type='tel' placeholder='Номер телефона' minLength='11' maxLength='12' pattern='^(8|\+7)\d{10}$' title='Формат номера: 8xxxxxxxxxx или +7xxxxxxxxxx' required autoComplete='tel' ref={phone_numberRef}/>
        </div>
        <div className='verContainer'>
            <Label htmlFor='passport_details'>Серия и номер паспорта</Label>
            <Input id='passport_details' type='text' placeholder='Серия и номер паспорта' ref={passport_detailsRef}/>
        </div>

        <YellowButton type='submit'>Добавить</YellowButton>
    </Form>
  )
}

export default NewClientForm