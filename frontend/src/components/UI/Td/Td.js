import React from 'react'

import styles from './Td.module.css'

function Td({children, selected, ...props}) {
  return (
    <td className={`${styles.td} ${selected ? styles.selected : ''}`} {...props}>
        {children}
    </td>
  )
}

export default Td