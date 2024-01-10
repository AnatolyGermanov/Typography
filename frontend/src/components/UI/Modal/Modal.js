import React from 'react'
import styles from './Modal.module.css'

function Modal({children, setVisible}) {
  return (
    <div className={styles.modal} onClick={() => setVisible(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}

export default Modal