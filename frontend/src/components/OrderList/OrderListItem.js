import React, { useState } from 'react'

import moment from 'moment'

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
        moment(order.receipt_date).format('DD.MM.YYYY'),
        moment(order.target_date).format('DD.MM.YYYY'),
        order.total_order_cost
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