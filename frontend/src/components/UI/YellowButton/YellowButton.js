import React from 'react'

import styles from './YellowButton.module.css'

function YellowButton({children, ...props}) {
  return (
    <button className={styles.yellowButton} {...props} >{children}</button>
  )
}

export default YellowButton