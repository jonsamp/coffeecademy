import React from 'react'
import Step from '../components/instructions/Step'
import Nav from '../components/instructions/Nav'
import ComponentContainer from '../containers/ComponentContainer'
import SummaryContainer from '../containers/SummaryContainer'

export default class InstructionsContainer extends React.Component {

  state = {
    stepIndex: 0,
    lastStep: this.props.currentRecipe.steps.length - 1,
    currentStep: this.props.currentRecipe.steps[0],
    grams: null,
    bloomWater: null,
    pourWater: null,
    iceWater: null,
    summaryVisible: false
  }

  componentDidMount() {
    // Sets initial grams to the minimum for the GramSlider component
    this.initializeGramSlider()
  }


  initializeGramSlider() {
    const { currentRecipe } = this.props
    const { gramSlider } = this.state.currentStep.components
    if (gramSlider) {
      this.setState({
        grams: gramSlider.min,
        bloomWater: gramSlider.min * currentRecipe.bloomMultiplier,
        pourWater: ((gramSlider.min * currentRecipe.pourMultiplier) - (gramSlider.min * currentRecipe.bloomMultiplier)),
        iceWater: gramSlider.min * currentRecipe.iceWaterMultiplier
      })
    }
  }

  setGrams = (v) => {
    const { bloomMultiplier, pourMultiplier, iceWaterMultiplier } = this.props.currentRecipe
    this.setState({
      grams: v,
      bloomWater: v * bloomMultiplier,
      pourWater: ((v * pourMultiplier) - (v * bloomMultiplier)),
      iceWater: v * iceWaterMultiplier
    })
  }

  advanceStep = () => {

    let stepIndex = Number(this.state.stepIndex) + 1

    // If last step, toggle the menu
    if (this.state.stepIndex === this.state.lastStep) {
      // console.log('The recipe is complete.')
      this.toggleSummary()
      // this.props.toggleMenu()
    } else {

      // Advance current step
      this.setState({
        stepIndex: stepIndex,
        currentStep: this.props.currentRecipe.steps[stepIndex]
      }, () => {

        // Sets up gramslider
        if (this.state.stepIndex <= this.state.lastStep) {
          this.initializeGramSlider()
        } else {
          this.setState({
            summaryVisible: true
          })
        }
      })
    }
  }

  goToStep = (el) => {
    let step = el.target.attributes.value.nodeValue
    this.setState({
      stepIndex: step,
      currentStep: this.props.currentRecipe.steps[step]
    }, () => {

      // Sets up gramslider
      this.initializeGramSlider()
    })
  }

  toggleSummary = () => {
    let toggle = this.state.summaryVisible ? false : true
    this.setState({
      summaryVisible: toggle
    })
  }

  interpolateGrams(instruction) {
    return instruction.replace(/\$\{.*\}/, this.insertGrams)
  }

  insertGrams = (match) => {
    const word = match.slice(2, match.length - 1)
    return Math.round(this.state[word])
  }

  isEmptyObject(obj) {
    for(var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  }



  displayStep() {
    // Only create the elements when there is a recipe
    if (this.props.currentRecipe && this.state.stepIndex <= this.state.lastStep) {
      let interpolatedSummary = this.interpolateGrams(this.state.currentStep.summary)
      let interpolatedInstruction = this.interpolateGrams(this.state.currentStep.instructions)
      let component;
      let emptyComponent = this.isEmptyObject(this.state.currentStep.components)
      if (!emptyComponent) {
        component = <ComponentContainer currentStep={this.state.currentStep} setGrams={this.setGrams} currentGrams={this.state.grams} advanceStep={this.advanceStep}/>
      }

      return (
        <div style={{ display: 'flex', width: '100%'}}>
          <Step title={this.state.currentStep.title} summary={interpolatedSummary} instructions={interpolatedInstruction} image={this.state.currentStep.image} emptyComponent={emptyComponent}/>
            {component}
        </div>
      )
    }
  }

  displayInstructions() {
    return (
      <div>
        {this.displayStep()}
        <Nav nextStep={this.advanceStep} toggleMenu={this.props.toggleMenu} recipe={this.props.currentRecipe} currentStep={this.state.stepIndex} goToStep={this.goToStep}/>
      </div>
    )
  }

  displaySummary() {
      // let audio = new Audio('https://s3.amazonaws.com/coffeecademy/tada.mp3')
      // setTimeout(() => { audio.play() }, 1000)

      return (
        <SummaryContainer grams={this.state.grams} recipe={this.props.currentRecipe} toggleMenu={this.props.toggleMenu}/>
      )
  }

  render() {
    if (this.state.summaryVisible) {
      return this.displaySummary()
    } else {
      return this.displayInstructions()
    }
  }
}
