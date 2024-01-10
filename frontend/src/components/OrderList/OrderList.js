import React, { useEffect, useState } from 'react'

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

function OrderList() {
    const [orderList, setOrderList] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [newOrderFormVisible, setNewOrderFormVisible] = useState(false)
    const [changeOrderFormVisible, setChangeOrderFormVisible] = useState(false)
    const [deleteOrderConfirmVisible, setDeleteOrderConfirmVisible] = useState(false)
    
    const getOrders = async () => {
        const auth_token = localStorage.getItem('auth_token')

        try {
            const res = await instance.get('api/v1/orderlist/', {
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
    }, [])

    const selectOrder = (order) => {
        setSelectedOrder(order);
    }

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
                    </>
                    : null
                }
            </ActionButtons>
            <Table>
                <OrderListHeader />
                <tbody>
                    {orderList.length ?
                        orderList.map((order) => {
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