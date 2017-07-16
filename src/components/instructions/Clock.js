import React from 'react';
import { Circle } from 'rc-progress';
import styles from './index.scss';

const Clock = ({ time, percent, startTimer, timerRunning }) => {
  let buttonPulse;

  if (timerRunning) {
    buttonPulse = {
      animation: 'none',
      opacity: '0.8'
    };
  }

  return (
    <div className={styles.clockComponent}>
      <h1 className={styles.clock}>
        {time}
      </h1>
      <div className={styles.circularTime}>
        <Circle
          percent={percent}
          strokeWidth="6"
          trailWidth="6"
          strokeColor="#FF5000"
          trailColor="#752100"
          className={styles.circle}
        />
      </div>
      <div
        className={styles.startButton}
        style={buttonPulse}
        onClick={startTimer}
      >
        {timerRunning ? 'Pause' : 'Start Timer'}
      </div>
    </div>
  );
};

export default Clock;
