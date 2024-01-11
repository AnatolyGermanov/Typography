import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

import Form from '../UI/Form/Form'
import Label from '../UI/Label/Label'
import Input from '../UI/Input/Input'
import CloseButton from '../UI/CloseButton/CloseButton'
import YellowButton from '../UI/YellowButton/YellowButton'
import instance from '../../utils/axios/instance'
import Select from '../UI/Select/Select'

function NewOrderForm({getOrders, setVisible}) {
    const [clients, setClients] = useState([])
    const [options, setOptions] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const clientRef = useRef()
    const target_dateRef = useRef()
    const {user} = useAuth()

    const {clientId} = useParams()

    const defaultOption = options.find((option) => option.value === Number(clientId))

    const getClients = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token')

            const res = await instance.get('api/v1/clientlist/', {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            setClients(res.data)
        }
        catch (error) {
            
        }
    }

    useMemo(() => {
        const filteredClients = clients.filter((client) => {
            return client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    client.patronymic.toLowerCase().includes(searchQuery.toLowerCase())
        })

        setOptions(
            filteredClients.map((client) => {
                return {value: client.id, label: `${client.first_name} ${client.last_name} ${client.patronymic}`}
            })
        )

    }, [clients, searchQuery])

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue)
    };
    
    const newOrder = async (event) => {
        event.preventDefault()

        try {
            const auth_token = localStorage.getItem('auth_token')

            await instance.post('api/v1/orderlist/', {
                client_id: clientRef.current.props.value.value,
                staff_id: user.id,
                target_date: target_dateRef.current.value
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            getOrders()

            setVisible(false)
        }
        catch (error) {
            
        }
    }

    useEffect(() => {
        getClients()
    }, [])

  return (
    <Form onSubmit={newOrder}>
        <div className='horContainer'>
            <h3>Заказ (добавление)</h3>
            <CloseButton onClick={() => setVisible(false)} />
        </div>

        <div className='verContainer'>
            <Label htmlFor='client'>Клиент</Label>
            <Select id='client' placeholder='Выбрать клиента' required OnInputChange={handleInputChange} options={options} value={defaultOption} ref={clientRef} />
        </div>
        <div className='verContainer'>
            <Label htmlFor='target_date'>Дата планового выполнения</Label>
            <Input id='target_date' type='date' placeholder='Дата планового выполнения' required ref={target_dateRef} />
        </div>
        

        <YellowButton type='submit'>Добавить</YellowButton>
    </Form>
  )
}

export default NewOrderForm