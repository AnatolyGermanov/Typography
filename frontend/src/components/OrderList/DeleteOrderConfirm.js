import React from 'react'
import CloseButton from '../UI/CloseButton/CloseButton'
import RedButton from '../UI/RedButton/RedButton'
import instance from '../../utils/axios/instance'

function DeleteOrderConfirm({order, getOrders, selectOrder, setVisible}) {
    
    const deleteOrder = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token')

            await instance.delete(`api/v1/orderlist/${order.id}/`, {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            getOrders()

            selectOrder(null)
            
            setVisible(false)
        }
        catch (error) {
            
        }
    }
  
    return (
    <div className='container'>
        <div className='horContainer'>
            <h3>Подтверждение удаления</h3>
            <CloseButton onClick={() => setVisible(false)} />
        </div>
        <p>Вы действительно хотите удалить выбранный заказ?</p>
        <RedButton onClick={deleteOrder}>Удалить</RedButton>
    </div>
  )
}

export default DeleteOrderConfirm