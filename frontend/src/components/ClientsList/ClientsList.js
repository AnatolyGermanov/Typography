import React, { useEffect, useState } from 'react'

import instance from '../../utils/axios/instance'

import Table from '../UI/Table/Table'
import ClientsListHeader from './ClientsListHeader'
import ClientsListItem from './ClientsListItem'
import WhiteButton from '../UI/WhiteButton/WhiteButton'
import RedButton from '../UI/RedButton/RedButton'
import ActionButtons from '../UI/ActionButtons/ActionButtons'
import Modal from '../UI/Modal/Modal'
import NewClientForm from './NewClientForm'
import ChangeClientForm from './ChangeClientForm'
import DeleteClientConfirm from './DeleteClientConfirm'

function ClientsList() {
    const [clientList, setClientList] = useState([])
    const [selectedClient, setSelectedClient] = useState(null)
    const [newClientFormVisible, setNewClientFormVisible] = useState(false)
    const [changeClientFormVisible, setChangeClientFormVisible] = useState(false)
    const [deleteClientConfirmVisible, setDeleteClientConfirmVisible] = useState(false)
    
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
            {newClientFormVisible ?
                <Modal setVisible={setNewClientFormVisible}>
                    <NewClientForm getClients={getClients} setVisible={setNewClientFormVisible} />
                </Modal>
                : null
            }
            {changeClientFormVisible ?
                <Modal setVisible={setChangeClientFormVisible}>
                    <ChangeClientForm client={selectedClient} getClients={getClients} setVisible={setChangeClientFormVisible} />
                </Modal>
                : null
            }
            {deleteClientConfirmVisible ?
                <Modal setVisible={setDeleteClientConfirmVisible}>
                    <DeleteClientConfirm client={selectedClient} getClients={getClients} selectClient={selectClient} setVisible={setDeleteClientConfirmVisible} />
                </Modal>
                : null
            }
            <ActionButtons>
                <WhiteButton onClick={() => setNewClientFormVisible(true)}>Создать</WhiteButton>
                {selectedClient ?
                    <>
                        <WhiteButton onClick={() => setChangeClientFormVisible(true)}>Изменить</WhiteButton>
                        <RedButton onClick={() => setDeleteClientConfirmVisible(true)}>Удалить</RedButton>
                    </>
                    : null
                }
            </ActionButtons>
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