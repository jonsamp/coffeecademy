import React from 'react'
import styles from './index.scss'
import rightArrow from '../../images/right-arrow.svg'

const MenuItem = ({
  onClick,
  value,
  index,
  brewMethod,
  type
 }) => {
  return (
    <div className={[styles.item, styles[type]].join(' ')} onClick={onClick} value={value} key={index}>
      {brewMethod}
      <img src={rightArrow} value={value} />
    </div>
  )
}

export default MenuItem
