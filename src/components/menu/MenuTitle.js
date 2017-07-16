import React from 'react';
import styles from './index.scss';
import coffee from '../../images/cofee-icon.svg';
import tea from '../../images/tea-icon.svg';

const icons = {
  coffee: coffee,
  tea: tea
};

const MenuTitle = ({ section }) => {
  return (
    <div className={styles[section]}>
      <img src={icons[section]} className={styles.image} />
      {section}
    </div>
  );
};

export default MenuTitle;
