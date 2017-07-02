require('normalize.css/normalize.css')

import React from 'react'
import MenuContainer from './MenuContainer'
import InstructionsContainer from './InstructionsContainer'

// Coffee recipes
import chemex from '../recipes/chemex.json'
import pourOver from '../recipes/pourOver.json'
import aeropress from '../recipes/aeropress.json'
import percolator from '../recipes/percolator.json'

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

  getSelection = (e) => {

    // Gets value from menu button
    // Separates coffee or tea, then finds the brew method
    let beverage = e.target.attributes.value.nodeValue.split(' ')[0]
    let method = e.target.attributes.value.nodeValue.split(' ')[1]
    let recipe = this.state.recipes[beverage][method]

    // Sets state to selected brew method
    this.setState({
      currentRecipe: recipe
    })

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
