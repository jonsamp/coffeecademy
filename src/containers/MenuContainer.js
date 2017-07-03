import React, { Component } from 'react'
import TitleBar from '../components/menu/TitleBar'
import MenuItem from '../components/menu/MenuItem'
import chemex from '../images/chemex.svg'
import aeropress from '../images/aeropress.svg'
import pourOver from '../images/pourOver.svg'
import percolator from '../images/percolator.svg'
import icedChemex from '../images/iced-chemex.svg'

class MenuContainer extends Component {

  brewIcons = {
    chemex,
    aeropress,
    pourOver,
    percolator,
    icedChemex
  }

  menuItems(type) {

    // Gets beverage type
    let beverage = this.props.recipes[type]

    // Loop through all keys, display all menu items of that type.
    // The value attr gets passed up to ViewContainer, used in getSelection
    return Object.keys(beverage).map((recipe, index) => {
      return (
        <MenuItem onClick={this.props.getSelection} value={`${type} ${recipe}`} key={index} brewMethod={beverage[recipe].method} description={beverage[recipe].description} type={type} icon={this.brewIcons[recipe]} />
      )
    })
  }

  render() {
    return (
      <div>
        <TitleBar />
        {this.menuItems('coffee')}
      </div>
    )
  }
}

export default MenuContainer
