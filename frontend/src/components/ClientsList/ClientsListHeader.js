import React from 'react'

import Tr from '../UI/Tr/Tr'
import Th from '../UI/Th/Th'

function ClientsListHeader() {
  return (
    <thead>
        <Tr>
            <Th>№</Th>
            <Th>ФИО</Th>
            <Th>Номер телефона</Th>
        </Tr>
    </thead>
  )
}

export default ClientsListHeader