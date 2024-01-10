import React from 'react'
import CloseButton from '../UI/CloseButton/CloseButton'
import RedButton from '../UI/RedButton/RedButton'
import instance from '../../utils/axios/instance'

function DeleteClientConfirm({client, getClients, selectClient, setVisible}) {
    
    const deleteClient = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token')

            await instance.delete(`api/v1/clientlist/${client.id}/`, {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            getClients()

            selectClient(null)
            
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
        <p>Вы действительно хотите удалить выбранного клиента?</p>
        <RedButton onClick={deleteClient}>Удалить</RedButton>
    </div>
  )
}

export default DeleteClientConfirm