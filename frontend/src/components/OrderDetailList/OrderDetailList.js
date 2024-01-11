import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import instance from '../../utils/axios/instance'

import Table from '../UI/Table/Table'
import OrderListHeader from './OrderDetailListHeader'
import OrderListItem from './OrderDetailListItem'
import WhiteButton from '../UI/WhiteButton/WhiteButton'
import RedButton from '../UI/RedButton/RedButton'
import ActionButtons from '../UI/ActionButtons/ActionButtons'
import Modal from '../UI/Modal/Modal'
import NewOrderDetailForm from './NewOrderDetailForm'
import ChangeOrderDetailForm from './ChangeOrderDetailForm'
import DeleteOrderDetailConfirm from './DeleteOrderDetailConfirm'
import Input from '../UI/Input/Input'

function OrderDetailList() {
    const navigate = useNavigate()
    const [orderDetailList, setOrderDetailList] = useState([])
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null)
    const [newOrderDetailFormVisible, setNewOrderDetailFormVisible] = useState(false)
    const [changeOrderDetailFormVisible, setChangeOrderDetailFormVisible] = useState(false)
    const [deleteOrderDetailConfirmVisible, setDeleteOrderDetailConfirmVisible] = useState(false)
    
    const [orderSearchQuery, setOrderSearchQuery] = useState('')
    const [searchedByOrderDetailList, setSearchedByOrderDetailList] = useState([])

    const {orderId} = useParams()

    const getOrderDetails = async () => {
        const auth_token = localStorage.getItem('auth_token')

        try {
            const res = await instance.get('api/v1/orderdetaillist/', {
                params: {
                    orderId: orderId
                },
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            setOrderDetailList(res.data)
        }
        catch (error) {
            
        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [orderId])

    const selectOrderDetail = (orderDetail) => {
        setSelectedOrderDetail(orderDetail);
    }

    useMemo(() => {
        setSearchedByOrderDetailList(
            orderSearchQuery ?
            orderDetailList.filter((orderDetail) => {
                return orderDetail.order === Number(orderSearchQuery)
            })
            : orderDetailList
        )
    }, [orderSearchQuery, orderDetailList])

    return (
        <>
            {newOrderDetailFormVisible ?
                <Modal setVisible={setNewOrderDetailFormVisible}>
                    <NewOrderDetailForm getOrderDetails={getOrderDetails} setVisible={setNewOrderDetailFormVisible} />
                </Modal>
                : null
            }
            {changeOrderDetailFormVisible ?
                <Modal setVisible={setChangeOrderDetailFormVisible}>
                    <ChangeOrderDetailForm orderDetail={selectedOrderDetail} getOrderDetails={getOrderDetails} setVisible={setChangeOrderDetailFormVisible} />
                </Modal>
                : null
            }
            {deleteOrderDetailConfirmVisible ?
                <Modal setVisible={setDeleteOrderDetailConfirmVisible}>
                    <DeleteOrderDetailConfirm orderDetail={selectedOrderDetail} getOrderDetails={getOrderDetails} selectOrderDetail={selectOrderDetail} setVisible={setDeleteOrderDetailConfirmVisible} />
                </Modal>
                : null
            }

            <ActionButtons>
                <WhiteButton onClick={() => setNewOrderDetailFormVisible(true)}>Создать</WhiteButton>
                {selectedOrderDetail ?
                    <>
                        <WhiteButton onClick={() => setChangeOrderDetailFormVisible(true)}>Изменить</WhiteButton>
                        <RedButton onClick={() => setDeleteOrderDetailConfirmVisible(true)}>Удалить</RedButton>
                    </>
                    : null
                }
            </ActionButtons>

            {orderId ?
                <ActionButtons>
                    <WhiteButton onClick={() => navigate(-1)}>Назад</WhiteButton>
                </ActionButtons>
                : <div className='searchContainer'>
                    <img src='/search-interface-symbol_54481.png' alt='Search' />
                    <Input id='orderSearch' type='number' placeholder='Поиск по № заказа...' value={orderSearchQuery} onChange={(event) => setOrderSearchQuery(event.target.value)} />
                </div>
            }

            <Table>
                <OrderListHeader />
                <tbody>
                    {searchedByOrderDetailList.length ?
                        searchedByOrderDetailList.map((orderDetail) => {
                            return <OrderListItem 
                                        key={orderDetail.id}
                                        orderDetail={orderDetail}
                                        isSelected={selectedOrderDetail?.id === orderDetail.id}
                                        selectOrderDetail={selectOrderDetail}
                                    />
                        })
                        : null
                    }
                </tbody>
            </Table>
        </>
    )
}

export default OrderDetailList