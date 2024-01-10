import React from 'react'

import styles from './WhiteButton.module.css'

function WhiteButton({children, ...props}) {
  return (
    <button className={styles.whiteButton} {...props} >{children}</button>
  )
}

export default WhiteButton