import React from 'react'

import styles from './Navbar.module.css'

import CustomNavLink from '../UI/CustomNavLink/CustomNavLink';

function Navbar() {
  return (
    <div className={styles.navBar}>
        <CustomNavLink to={'/clients'}>Клиенты</CustomNavLink>
        <CustomNavLink to={'/orders'}>Заказы</CustomNavLink>
    </div>
  )
}

export default Navbar;