import React from 'react'
import styles from './index.scss'
import rightArrow from '../../images/right-arrow.svg'

const MenuItem = ({
  onClick,
  value,
  index,
  brewMethod,
  type,
  icon
 }) => {
  return (
    <div className={[styles.item, styles[type]].join(' ')} onClick={onClick} value={value} key={index} icon={icon}>
      <div style={{display: 'flex', alignItems: 'center'}} value={value}>
        <img src={"../../images/" + icon} style={{width: '3.5rem', marginRight: '1.5rem'}} value={value}/>
        {brewMethod}
      </div>
      <img src={rightArrow} value={value}/>
    </div>
  )
}

export default MenuItem
