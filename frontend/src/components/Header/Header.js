import React from 'react'

import styles from './Header.module.css'
import SignOut from '../SignOut/SignOut'
import Navbar from '../Navbar/Navbar'

function Header() {
  return (
    <header className={styles.header}>
        <Navbar />
        <SignOut />
    </header>
  )
}

export default Header