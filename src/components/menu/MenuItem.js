import React from 'react'
import s from './MenuItem.scss'
import rightArrow from '../../images/right-arrow.svg'

const MenuItem = ({
  onClick,
  value,
  brewMethod,
  description,
  cardIcon
 }) => (
  <div onClick={onClick} name={value} className={s.menuItem}>
    <div className={s.itemMedia} style={{
      backgroundImage: `url(${cardIcon})`
    }}>
    </div>
    <div className={s.itemBody}>
      <h1 className={s.title}>{brewMethod}</h1>
      <p className={s.description}>{description}</p>
    </div>
  </div>
)

export default MenuItem
