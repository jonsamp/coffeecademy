require('normalize.css/normalize.css')

import React from 'react'
import MenuContainer from './MenuContainer'
import InstructionsContainer from './InstructionsContainer'

// Coffee recipes
import chemex from '../recipes/chemex.json'
import pourOver from '../recipes/pourOver.json'
import aeropress from '../recipes/aeropress.json'

// Tea recipes
import black from '../recipes/black.json'

export default class ViewContainer extends React.Component {

  constructor(props) {
    super(props)

    // Binds `this` to toggleMenu when navigating from other containers
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  state = {
    menuVisible: true,
    currentRecipe: null
  }

  importRecipes = {
    coffee: {
      chemex: chemex,
      pourOver: pourOver,
      aeropress: aeropress
    },
    tea: {
      black: black
    }
  }

  toggleMenu() {
    let toggle = this.state.menuVisible ? false : true
    this.setState({
      menuVisible: toggle
    })
  }

  getSelection = (el) => {

    // Gets value from menu button
    // Separates coffee or tea, then finds the brew method
    let beverage = el.target.attributes.value.nodeValue.split(' ')[0]
    let method = el.target.attributes.value.nodeValue.split(' ')[1]
    let recipe = this.importRecipes[beverage][method]

    // Sets state to selected brew method
    this.setState({
      currentRecipe: recipe
    })

    // Toggle to the InstructionsContainer
    this.toggleMenu()
  }

  currentView() {
    if (this.state.menuVisible) {
      return <MenuContainer getSelection={this.getSelection} recipes={this.importRecipes} />
    } else {
      return <InstructionsContainer currentRecipe={this.state.currentRecipe} toggleMenu={this.toggleMenu} />
    }
  }

  render() {
    return this.currentView()
  }
}
