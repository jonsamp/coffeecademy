import React from 'react'
import styles from './index.scss'
import rightArrow from '../../images/right-arrow.svg'

const MenuItem = ({
  onClick,
  value,
  index,
  brewMethod,
  description,
  type,
  icon
 }) => (
  <div onClick={onClick} name={value}>
    <div className={[styles.item, styles[type]].join(' ')} key={index} icon={icon}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={icon} style={{width: '3.5rem', marginRight: '1.5rem'}}/>
        <div>
          <span className={styles.methodTitle}>{brewMethod}</span>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <img src={rightArrow}/>
    </div>
  </div>
)

export default MenuItem
