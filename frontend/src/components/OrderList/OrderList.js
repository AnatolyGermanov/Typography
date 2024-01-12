import React, { useEffect, useMemo, useState } from 'react'

import instance from '../../utils/axios/instance'

import Table from '../UI/Table/Table'
import OrderListHeader from './OrderListHeader'
import OrderListItem from './OrderListItem'
import WhiteButton from '../UI/WhiteButton/WhiteButton'
import RedButton from '../UI/RedButton/RedButton'
import ActionButtons from '../UI/ActionButtons/ActionButtons'
import Modal from '../UI/Modal/Modal'
import NewOrderForm from './NewOrderForm'
import ChangeOrderForm from './ChangeOrderForm'
import DeleteOrderConfirm from './DeleteOrderConfirm'
import Input from '../UI/Input/Input'
import { useNavigate, useParams } from 'react-router-dom'
import OrderDocument from './OrderDocument'

function OrderList() {
    const navigate = useNavigate()
    const [orderList, setOrderList] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [newOrderFormVisible, setNewOrderFormVisible] = useState(false)
    const [changeOrderFormVisible, setChangeOrderFormVisible] = useState(false)
    const [deleteOrderConfirmVisible, setDeleteOrderConfirmVisible] = useState(false)
    
    const [clientSearchQuery, setClientSearchQuery] = useState('')
    const [searchedByClientOrderList, setSearchedByClientOrderList] = useState([])

    const {clientId} = useParams()

    const getOrders = async () => {
        const auth_token = localStorage.getItem('auth_token')
        
        try {
            const res = await instance.get('api/v1/orderlist/', {
                params: {
                    clientId: clientId
                },
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })
            
            setOrderList(res.data)
        }
        catch (error) {
            
        }
    }
    
    useEffect(() => {
        getOrders()
    }, [clientId])
    
    const selectOrder = (order) => {
        setSelectedOrder(order);
    }
    
    useMemo(() => {
        setSearchedByClientOrderList(
            orderList.filter((order) => {
                return order.client.first_name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
                    order.client.last_name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
                    order.client.patronymic.toLowerCase().includes(clientSearchQuery.toLowerCase())
            })
        )
    }, [clientSearchQuery, orderList])

    return (
        <>
            {newOrderFormVisible ?
                <Modal setVisible={setNewOrderFormVisible}>
                    <NewOrderForm getOrders={getOrders} setVisible={setNewOrderFormVisible} />
                </Modal>
                : null
            }
            {changeOrderFormVisible ?
                <Modal setVisible={setChangeOrderFormVisible}>
                    <ChangeOrderForm order={selectedOrder} getOrders={getOrders} setVisible={setChangeOrderFormVisible} />
                </Modal>
                : null
            }
            {deleteOrderConfirmVisible ?
                <Modal setVisible={setDeleteOrderConfirmVisible}>
                    <DeleteOrderConfirm order={selectedOrder} getOrders={getOrders} selectOrder={selectOrder} setVisible={setDeleteOrderConfirmVisible} />
                </Modal>
                : null
            }

            <ActionButtons>
                <WhiteButton onClick={() => setNewOrderFormVisible(true)}>Создать</WhiteButton>
                {selectedOrder ?
                    <>
                        <WhiteButton onClick={() => setChangeOrderFormVisible(true)}>Изменить</WhiteButton>
                        <RedButton onClick={() => setDeleteOrderConfirmVisible(true)}>Удалить</RedButton>
                        <WhiteButton onClick={() => navigate(`/ordersdetails/${selectedOrder.id}`)}>Детали</WhiteButton>
                        <OrderDocument order={selectedOrder} />
                    </>
                    : null
                }
            </ActionButtons>

            {clientId ?
                <ActionButtons>
                    <WhiteButton onClick={() => navigate(-1)}>Назад</WhiteButton>
                </ActionButtons>
                : <div className='searchContainer'>
                    <img src='/search-interface-symbol_54481.png' alt='Search' />
                    <Input id='clientSearch' type='text' placeholder='Поиск по заказчику...' value={clientSearchQuery} onChange={(event) => setClientSearchQuery(event.target.value)} />
                </div>
            }

            <Table>
                <OrderListHeader />
                <tbody>
                    {searchedByClientOrderList.length ?
                        searchedByClientOrderList.map((order) => {
                            return <OrderListItem 
                                        key={order.id}
                                        order={order}
                                        isSelected={selectedOrder?.id === order.id}
                                        selectOrder={selectOrder}
                                    />
                        })
                        : null
                    }
                </tbody>
            </Table>
        </>
    )
}

export default OrderList