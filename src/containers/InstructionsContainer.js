import React from 'react'
import Step from '../components/instructions/Step'
import Nav from '../components/instructions/Nav'
import ComponentContainer from '../containers/ComponentContainer'

export default class InstructionsContainer extends React.Component {

  // TODO:
  // Interpolate instructions with correct values

  state = {
    currentStep: 0,
    lastStep: this.props.currentRecipe.steps.length - 1,
    grams: null,
    bloomWater: null,
    pourWater: null
  }

  componentDidMount() {

    let currentStep = this.props.currentRecipe.steps[this.state.currentStep]
    // Sets initial grams to the minimum for the GramSlider component
    if(currentStep.components.gramSlider) {
      this.setState({
        grams: currentStep.components.gramSlider.min,
        bloomWater: currentStep.components.gramSlider.min * this.props.currentRecipe.bloomMultiplier,
        pourWater: currentStep.components.gramSlider.min * this.props.currentRecipe.pourMultiplier
      })
    }
  }

  setGrams = (v) => {
    this.setState({
      grams: v,
      bloomWater: v,
      pourWater: v
    })
  }

  advanceStep = () => {

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

  interpolateGrams(instruction) {
    return instruction.replace(/\$\{.*\}/, this.insertGrams)
  }

  insertGrams = (match) => {
    const word = match.slice(2, match.length - 1)
    return this.state[word]
  }

  displayStep() {

    // Only create the elements when there is a recipe
    if (this.props.currentRecipe) {
      let currentStep = this.props.currentRecipe.steps[this.state.currentStep]
      let interpolatedSummary = this.interpolateGrams(currentStep.summary)
      let interpolatedInstruction = this.interpolateGrams(currentStep.instructions)

      return (
        <div style={{ display: 'flex', width: '100%'}}>
        <Step title={currentStep.title} summary={interpolatedSummary} instructions={interpolatedInstruction} image={currentStep.image} />
        <ComponentContainer currentStep={currentStep} setGrams={this.setGrams} currentGrams={this.state.grams}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.displayStep()}
        <Nav nextStep={this.advanceStep} toggleMenu={this.props.toggleMenu} recipe={this.props.currentRecipe} currentStep={this.state.currentStep}/>
      </div>
    )
  }
}
