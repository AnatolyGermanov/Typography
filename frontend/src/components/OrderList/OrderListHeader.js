import React from 'react'

import Tr from '../UI/Tr/Tr'
import Th from '../UI/Th/Th'

function OrderListHeader() {
  return (
    <thead>
        <Tr>
            <Th>№</Th>
            <Th>Заказчик</Th>
            <Th>Сотрудник</Th>
            <Th>Дата приема</Th>
            <Th>Дата планового выполнения</Th>
        </Tr>
    </thead>
  )
}

export default OrderListHeader