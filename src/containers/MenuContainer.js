import React from 'react'

import TitleBar from '../components/TitleBar'

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
        <button onClick={this.props.getSelection} value={`${type} ${recipe}`} key={index} style={this.styles}>
          {beverage[recipe].method}
        </button>
      )
    })
  }

  render() {
    return (
      <div>
        <TitleBar />
        {this.menuItems('coffee')}
        {this.menuItems('tea')}
      </div>
    )
  }
}
