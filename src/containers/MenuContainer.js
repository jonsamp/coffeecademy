import React from 'react'

import TitleBar from '../components/menu/TitleBar'
import MenuTitle from '../components/menu/MenuTitle'
import MenuItem from '../components/menu/MenuItem'

import chemex from '../images/chemex.svg'
import aeropress from '../images/aeropress.svg'
import pourOver from '../images/pourOver.svg'
import percolator from '../images/percolator.svg'

export default class MenuContainer extends React.Component {

  brewIcons = {
    chemex,
    aeropress,
    pourOver,
    percolator
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

  styles = {
    width: '100%',
    margin: '1rem 0',
    height: '4rem'
  }

  render() {
    return (
      <div>
        <TitleBar />
          <div style={{display: 'flex'}}>
            <div style={{width: '100%', height: '90vh'}}>
              <MenuTitle section='coffee' />
              {this.menuItems('coffee')}
            </div>
          </div>
      </div>
    )
  }
}
