import React from 'react'
import { Circle } from 'rc-progress'
import styles from './index.scss'

const Clock = ({
  time,
  percent,
  startTimer,
  timerRunning
}) => {
  let style ={
    width: '65%',
    display: 'flex',
    margin: 'auto',
    marginTop: '-30%'
  }

  let buttonPulse;

  if (timerRunning) {
    buttonPulse = {
      animation: 'none',
      opacity: '0.8'
    }
  }

  return (
    <div className={styles.clockComponent}>
      <Circle percent={percent} strokeWidth="6" trailWidth="6" strokeColor="#FF5000" trailColor="#752100" style={style} className={styles.circle}/>
      <h1 className={styles.clock}>{time}</h1>
      <div className={styles.startButton} style={buttonPulse} onClick={startTimer} >{ timerRunning ? 'Pause' : 'Start Timer'}</div>
    </div>
  )
}

export default Clock
