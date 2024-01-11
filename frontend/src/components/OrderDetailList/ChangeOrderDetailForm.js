import React, { useEffect, useMemo, useRef, useState } from 'react'

import Form from '../UI/Form/Form'
import Label from '../UI/Label/Label'
import Input from '../UI/Input/Input'
import CloseButton from '../UI/CloseButton/CloseButton'
import YellowButton from '../UI/YellowButton/YellowButton'
import instance from '../../utils/axios/instance'
import Select from '../UI/Select/Select'

function ChangeOrderForm({orderDetail, getOrderDetails, setVisible}) {
    const [services, setServices] = useState([])
    const [options, setOptions] = useState([])
    const defaultOption = {value: orderDetail.service.id, label: `${orderDetail.service.title} | ${orderDetail.service.current_service_cost || '-'}`}

    const [searchQuery, setSearchQuery] = useState('')
    const order_idRef = useRef()
    const serviceRef = useRef()
    const amountRef = useRef()


    const getServices = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token')

            const res = await instance.get('api/v1/servicelist/', {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            setServices(res.data)
        }
        catch (error) {
            
        }
    }

    useMemo(() => {
        const filteredServices = services.filter((service) => {
            return service.title.toLowerCase().includes(searchQuery.toLowerCase())
        })

        setOptions(
            filteredServices.map((service) => {
                return {value: service.id, label: `${service.title} | ${service.current_service_cost || '-'}`}
            })
        )

    }, [services, searchQuery])

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue)
    };
    
    const changeOrder = async (event) => {
        event.preventDefault()

        try {
            const auth_token = localStorage.getItem('auth_token')

            await instance.patch(`api/v1/orderdetaillist/${orderDetail.id}/`, {
                order: order_idRef.current.value,
                service_id: serviceRef.current.props.value.value,
                amount: amountRef.current.value
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            getOrderDetails()

            setVisible(false)
        }
        catch (error) {
            
        }
    }

    useEffect(() => {
        getServices()
    }, [])

  return (
    <Form onSubmit={changeOrder}>
        <div className='horContainer'>
            <h3>Детали заказа (редактирование)</h3>
            <CloseButton onClick={() => setVisible(false)} />
        </div>

        <div className='verContainer'>
            <Label htmlFor='order_id'>№ заказа</Label>
            <Input id='order_id' type='number' min='1' placeholder='№ заказа' required defaultValue={orderDetail.order} ref={order_idRef} />
        </div>
        <div className='verContainer'>
            <Label htmlFor='service'>Услуга</Label>
            <Select id='service' placeholder='Выбрать услугу' required OnInputChange={handleInputChange} options={options} defaultValue={defaultOption} ref={serviceRef} />
        </div>
        <div className='verContainer'>
            <Label htmlFor='amount'>Количество</Label>
            <Input id='amount' type='number' min='1' placeholder='Количество' required defaultValue={orderDetail.amount} ref={amountRef} />
        </div>
        
        <YellowButton type='submit'>Изменить</YellowButton>
    </Form>
  )
}

export default ChangeOrderForm