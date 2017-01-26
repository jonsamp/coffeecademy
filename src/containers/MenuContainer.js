import React from 'react'

import TitleBar from '../components/menu/TitleBar'
import MenuTitle from '../components/menu/MenuTitle'
import MenuItem from '../components/menu/MenuItem'

export default class MenuContainer extends React.Component {

  // TODO: Move styles to presentational component w/ DOM elements
  styles = {
    width: '100%',
    margin: '1rem 0',
    height: '4rem'
  }

  menuItems(type) {

    // Gets beverage type
    let beverage = this.props.recipes[type]

    // Loop through all keys, display all menu items of that type.
    // The value attr gets passed up to ViewContainer, used in getSelection
    return Object.keys(beverage).map((recipe, index) => {
      return (
        <MenuItem onClick={this.props.getSelection} value={`${type} ${recipe}`} key={index} brewMethod={beverage[recipe].method} type={type} icon={beverage[recipe].icon} />
      )
    })
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
            <div style={{width: '100%', backgroundColor: '#F0F0F0', height: '90vh'}}>
              <MenuTitle section='tea' />
              {this.menuItems('tea')}
            </div>
          </div>
      </div>
    )
  }
}
