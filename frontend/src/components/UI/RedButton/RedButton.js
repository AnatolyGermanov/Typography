import React from 'react'

import styles from './RedButton.module.css'

function RedButton({children, ...props}) {
  return (
    <button className={styles.whiteButton} {...props} >{children}</button>
  )
}

export default RedButton