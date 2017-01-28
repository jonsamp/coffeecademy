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
 }) => {
   let style;

   if (
     brewMethod === 'Pour Over' ||
     brewMethod === 'Aeropress' ||
     brewMethod === 'Percolator'
   ) {
     style = {
       opacity: '0.5',
       cursor: 'not-allowed'
     }

     value = '#'
   }

  return (
    <div className={[styles.item, styles[type]].join(' ')} onClick={onClick} value={value} key={index} icon={icon} style={style}>
      <div style={{display: 'flex', alignItems: 'center'}} value={value}>
        <img src={icon} style={{width: '3.5rem', marginRight: '1.5rem'}} value={value}/>
        <div>
          <span className={styles.methodTitle}>{brewMethod}</span>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <img src={rightArrow} value={value}/>
    </div>
  )
}

export default MenuItem
