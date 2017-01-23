import React from 'react'
import styles from './index.scss'

const Step = ({
  title,
  summary,
  instructions,
  image
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
      <h1>{title}</h1>
      <h3>{summary}</h3>
      <p>{instructions}</p>
      </div>
      <div className={styles.imageWrapper}>
      <img src="http://www.seriouseats.com/images/2014/06/20140619-pourover-wire.jpg" className={styles.image}/>
      </div>
    </div>
  )
}

export default Step
