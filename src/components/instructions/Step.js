import React from 'react'
import styles from './index.scss'

const Step = ({
  title,
  summary,
  instructions,
  image,
  emptyComponent
}) => {

  let style = {}
  if (emptyComponent) {
    style = {
      margin: 'auto',
      position: 'relative',
      top: '5vh',
      borderRadius: '6px',
      maxWidth: '33rem'
    }
  }

  return (
    <div className={styles.wrapper} style={style}>
      <div>
      <h1 className={styles.stepTitle}>{title}</h1>
      <h3 className={styles.step}>{summary}</h3>
      <p className={styles.step}>{instructions}</p>
      </div>
      <div className={styles.imageWrapper}>
      <img src={image} className={styles.image}/>
      </div>
    </div>
  )
}

export default Step
