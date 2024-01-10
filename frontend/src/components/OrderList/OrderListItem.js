import React, { useState } from 'react'
import Tr from '../UI/Tr/Tr'
import Td from '../UI/Td/Td'

function OrderListItem({order, isSelected, selectOrder}) {
    const [selectedCell, setSelectedCell] = useState(null)

    const selectCell = (index) => {
        setSelectedCell(index)
    }

    const orderInfo = [
        order.id,
        `${order.client.first_name} ${order.client.last_name[0]}. ${order.client.patronymic && order.client.patronymic[0] + '.'}`,
        `${order.staff.last_name} ${order.staff.first_name[0]}. ${order.staff.patronymic && order.staff.patronymic[0] + '.'}`,
        order.receipt_date,
        order.target_date
    ];

    return (
        <Tr onClick={() => selectOrder(order)} selected={isSelected}>
            {orderInfo.map((content, index) => {
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

export default OrderListItem