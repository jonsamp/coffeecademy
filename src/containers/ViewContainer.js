import React from 'react';
import MenuContainer from './MenuContainer';
import InstructionsContainer from './InstructionsContainer';

// Coffee recipes
import chemex from '../recipes/chemex.json';
import pourOver from '../recipes/pourOver.json';
import aeropress from '../recipes/aeropress.json';
import percolator from '../recipes/percolator.json';
import icedChemex from '../recipes/icedChemex.json';
import cupping from '../recipes/cupping.json';

export default class ViewContainer extends React.Component {
  state = {
    menuVisible: true,
    currentRecipe: null,
    recipes: {
      chemex,
      icedChemex,
      pourOver,
      aeropress,
      percolator,
      cupping
    }
  };

  toggleMenu = () => {
    let menuVisible = this.state.menuVisible ? false : true;
    this.setState({
      menuVisible,
      summaryVisible: false
    });
  };

  getMenuItemParentElement = e => {
    return e.getAttribute('name')
      ? e.getAttribute('name')
      : this.getMenuItemParentElement(e.parentNode);
  };

  getSelection = e => {
    const menuItem = this.getMenuItemParentElement(e.target);

    // Gets value from menu button
    let currentRecipe = this.state.recipes[menuItem];

    // Sets state to selected brew method
    this.setState({ currentRecipe });

    // Toggle to the InstructionsContainer
    this.toggleMenu();
  };

  render() {
    if (this.state.menuVisible) {
      return (
        <MenuContainer
          getSelection={this.getSelection}
          recipes={this.state.recipes}
        />
      );
    } else {
      return (
        <InstructionsContainer
          currentRecipe={this.state.currentRecipe}
          toggleMenu={this.toggleMenu}
          toggleSummary={this.toggleSummary}
          brewIcons={this.brewIcons}
        />
      );
    }
  }
}
