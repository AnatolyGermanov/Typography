import React, { useState } from 'react'
import Tr from '../UI/Tr/Tr'
import Td from '../UI/Td/Td'

function ClientsListItem({client, isSelected, selectClient}) {
    const [selectedCell, setSelectedCell] = useState(null)

    const selectCell = (index) => {
        setSelectedCell(index)
    }

    const clientInfo = [
        client.id,
        `${client.first_name} ${client.last_name} ${client.patronymic && client.patronymic}`,
        client.phone_number
    ];

    return (
        <Tr onClick={() => selectClient(client)} selected={isSelected}>
            {clientInfo.map((content, index) => {
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

export default ClientsListItem