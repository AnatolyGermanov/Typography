import React from 'react'

import styles from './ActionButtons.module.css'

function ActionButtons({children, ...props}) {
  return (
    <div className={styles.actionButtons} {...props}>
        {children}
    </div>
  )
}

export default ActionButtons