import React, { Component } from 'react';
import TitleBar from '../components/menu/TitleBar';
import MenuItem from '../components/menu/MenuItem';
import s from './styles/MenuContainer.scss';

class MenuContainer extends Component {
  menuItems() {
    // Gets beverage type
    const recipes = this.props.recipes;

    // Loop through all keys, display all menu items
    // The value attr gets passed up to ViewContainer, used in getSelection
    return Object.keys(recipes).map((recipe, index) => {
      return (
        <MenuItem
          onClick={this.props.getSelection}
          value={recipe}
          key={index}
          brewMethod={recipes[recipe].method}
          description={recipes[recipe].description}
          cardIcon={recipes[recipe].cardIcon}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <TitleBar />
        <div className={s.menu}>
          {this.menuItems()}
        </div>
      </div>
    );
  }
}

export default MenuContainer;
