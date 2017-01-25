import React from 'react'
import { Circle } from 'rc-progress'
import styles from './index.scss'

const Clock = ({
  time,
  percent
}) => {
  let style ={
    width: '65%',
    display: 'flex',
    margin: 'auto',
    marginTop: '-30%'
  }
  return (
    <div>
      <Circle percent={percent} strokeWidth="6" trailWidth="6" strokeColor="#FF5000" trailColor="#752100" style={style} />
      <h1 className={styles.clock}>{time}</h1>
    </div>
  )
}

export default Clock
