import React, { useState } from 'react'
import Tr from '../UI/Tr/Tr'
import Td from '../UI/Td/Td'

function OrderDetailListItem({orderDetail, isSelected, selectOrderDetail}) {
    const [selectedCell, setSelectedCell] = useState(null)

    const selectCell = (index) => {
        setSelectedCell(index)
    }

    const orderDetailInfo = [
        orderDetail.id,
        orderDetail.order,
        orderDetail.service.title,
        orderDetail.amount,
    ];

    return (
        <Tr onClick={() => selectOrderDetail(orderDetail)} selected={isSelected}>
            {orderDetailInfo.map((content, index) => {
                return <Td
                            key={index}
                            onClick={() => selectCell(index)}
                            selected={isSelected && selectedCell === index}
                        >
                            {content}
                        </Td>
                })
            }
        </Tr>
    )
}

export default OrderDetailListItem