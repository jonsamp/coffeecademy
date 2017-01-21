import React from 'react'

export default class InstructionsContainer extends React.Component {

  // TODO:
  // 1. Make component pane
  // 2. Make footer pane
  // 3. Interpolate instructions with correct values

  state = {
    currentStep: 0,
    lastStep: this.props.currentRecipe.steps.length - 1
  }

  showRecipe() {

    // Only create the elements when there is a recipe
    if (this.props.currentRecipe) {
      return (
        <div>
          <p>Current recipe: {this.props.currentRecipe.method}</p>
          <p>Number of steps: {this.state.lastStep}</p>
          <p>Steps:</p>
          <ul>
            {this.listSteps()}
          </ul>
        </div>
      )
    }
  }

  listSteps() {

    // Shows only the current step's instruction
    return (
      <li>{this.props.currentRecipe.steps[this.state.currentStep].instructions}</li>
    )
  }

  advanceStep = (e) => {
    e.preventDefault()

    // If last step, toggle the menu
    if (this.state.currentStep === this.state.lastStep) {
      this.props.toggleMenu()
    } else {

      // Advance current step
      this.setState({
        currentStep: ++this.state.currentStep
      })
    }
  }

  render() {
    return (
      <div>
        {this.showRecipe()}
        <button onClick={this.advanceStep}>Next Step >></button>
        <br/>
        <br/>
        <button onClick={this.props.toggleMenu}>Go to menu</button>
      </div>
    )
  }
}
