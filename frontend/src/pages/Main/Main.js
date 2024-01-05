import React from 'react'

import styles from './Main.module.css'

import SignOn from '../../components/SignOn/SignOn'

function Main() {
  return (
    <div className={styles.container}>
        <h1>Типография</h1>
        <h3 style={{marginBottom: '-25px'}}>Вход в систему</h3>
        <SignOn />
    </div>
  )
}

export default Main