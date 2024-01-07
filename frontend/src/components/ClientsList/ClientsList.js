import React, { useEffect, useState } from 'react'

import Table from '../UI/Table/Table'
import ClientsListHeader from './ClientsListHeader'
import instance from '../../utils/axios/instance'
import ClientsListItem from './ClientsListItem'

function ClientsList() {
    const [clientList, setClientList] = useState([])
    const [selectedClient, setSelectedClient] = useState(null)

    const getClients = async () => {
        const auth_token = localStorage.getItem('auth_token')

        try {
            const res = await instance.get('api/v1/clientlist/', {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            setClientList(res.data)
        }
        catch (error) {
            
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    const selectClient = (client) => {
        setSelectedClient(client);
    }

    return (
        <>
            <Table>
                <ClientsListHeader />
                <tbody>
                    {clientList.length ?
                        clientList.map((client) => {
                            return <ClientsListItem 
                                        key={client.id}
                                        client={client}
                                        isSelected={selectedClient?.id === client.id}
                                        selectClient={selectClient}
                                    />
                        })
                        : null
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ClientsList