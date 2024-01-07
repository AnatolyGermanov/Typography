import React from 'react'

import styles from './Th.module.css'

function Th({children, ...props}) {
  return (
    <th className={styles.th} {...props}>
        {children}
    </th>
  )
}

export default Th