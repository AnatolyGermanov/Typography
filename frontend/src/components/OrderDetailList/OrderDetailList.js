import React, { useEffect, useState } from 'react'

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

function OrderDetailList() {
    const [orderDetailList, setOrderDetailList] = useState([])
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null)
    const [newOrderDetailFormVisible, setNewOrderDetailFormVisible] = useState(false)
    const [changeOrderDetailFormVisible, setChangeOrderDetailFormVisible] = useState(false)
    const [deleteOrderDetailConfirmVisible, setDeleteOrderDetailConfirmVisible] = useState(false)
    
    const getOrderDetails = async () => {
        const auth_token = localStorage.getItem('auth_token')

        try {
            const res = await instance.get('api/v1/orderdetaillist/', {
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
    }, [])

    const selectOrderDetail = (orderDetail) => {
        setSelectedOrderDetail(orderDetail);
    }

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
            <Table>
                <OrderListHeader />
                <tbody>
                    {orderDetailList.length ?
                        orderDetailList.map((orderDetail) => {
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