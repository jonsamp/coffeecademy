require('normalize.css/normalize.css')

import React from 'react'
import MenuContainer from './MenuContainer'
import InstructionsContainer from './InstructionsContainer'

// Coffee recipes
import chemex from '../recipes/chemex.json'
import pourOver from '../recipes/pourOver.json'
import aeropress from '../recipes/aeropress.json'
import percolator from '../recipes/percolator.json'
import icedChemex from '../recipes/icedChemex.json'

// Tea recipes
// import black from '../recipes/black.json'
// import white from '../recipes/white.json'
// import green from '../recipes/green.json'
// import oolong from '../recipes/oolong.json'
// import herb from '../recipes/herb.json'

export default class ViewContainer extends React.Component {

  state = {
    menuVisible: true,
    currentRecipe: null,
    recipes: {
      coffee: {
        chemex: chemex,
        icedChemex: icedChemex,
        pourOver: pourOver,
        aeropress: aeropress,
        percolator: percolator
      }
      // tea: {
      //   green: green,
      //   black: black,
      //   white: white,
      //   oolong: oolong,
      //   herb: herb
      // }
    }
  }

  toggleMenu = () => {
    let menuToggle = this.state.menuVisible ? false : true
    this.setState({
      menuVisible: menuToggle,
      summaryVisible: false
    })
  }

  getMenuItemParentElement = (e) => {
    return e.getAttribute('name') ? e.getAttribute('name') : this.getMenuItemParentElement(e.parentNode)
  }

  getSelection = (e) => {
    const menuItem = this.getMenuItemParentElement(e.target)

    // Gets value from menu button
    // Separates coffee or tea, then finds the brew method
    let beverage = menuItem.split(' ')[0]
    let method = menuItem.split(' ')[1]
    let currentRecipe = this.state.recipes[beverage][method]

    // Sets state to selected brew method
    this.setState({ currentRecipe })

    // Toggle to the InstructionsContainer
    this.toggleMenu()
  }

  render() {
    if (this.state.menuVisible) {
      return <MenuContainer getSelection={this.getSelection} recipes={this.state.recipes} />
    } else {
      return <InstructionsContainer currentRecipe={this.state.currentRecipe} toggleMenu={this.toggleMenu} toggleSummary={this.toggleSummary} />
    }
  }
}
