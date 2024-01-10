import React from 'react'

import styles from './CloseButton.module.css'

function CloseButton(props) {
  return (
    <div className={styles.closeButton} {...props}>
      <img src='/free-icon-close-4013407.png' alt='Close'/>
    </div>
  )
}

export default CloseButton