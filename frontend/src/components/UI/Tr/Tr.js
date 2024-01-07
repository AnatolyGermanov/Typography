import React from 'react'

import styles from './Tr.module.css'

function Tr({children, selected,  ...props}) {
  return (
    <tr className={`${styles.tr} ${selected ? styles.selected : ''}`} {...props}>
        {children}
    </tr>
  )
}

export default Tr