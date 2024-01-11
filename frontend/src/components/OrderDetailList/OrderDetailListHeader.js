import React from 'react'

import Tr from '../UI/Tr/Tr'
import Th from '../UI/Th/Th'

function OrderDetailListHeader() {
  return (
    <thead>
        <Tr>
            <Th>№ заказа</Th>
            <Th>Услуга</Th>
            <Th>Количество</Th>
            <Th>Цена</Th>
            <Th>Сумма</Th>
        </Tr>
    </thead>
  )
}

export default OrderDetailListHeader