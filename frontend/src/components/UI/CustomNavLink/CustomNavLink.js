import React from 'react'
import { Link, useMatch } from 'react-router-dom'

import styles from './CustomNavLink.module.css'

function CustomNavLink({children, to, ...props}) {
    const match = useMatch(to);
  return (
    <Link
        to={to}
        className={`${styles.link} ${match ? styles.active : ''}`}
        {...props}
    >
        {children}
    </Link>
  )
}

export default CustomNavLink;