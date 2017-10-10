import React from 'react';
import { isEmpty } from 'lodash';
import Step from '../components/instructions/Step';
import Nav from '../components/instructions/Nav';
import ComponentContainer from '../containers/ComponentContainer';
import SummaryContainer from '../containers/SummaryContainer';

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
  };

  componentDidMount() {
    // Sets initial grams to the minimum for the GramSlider component
    this.initializeGramSlider();
  }

  initializeGramSlider() {
    const { currentRecipe } = this.props;
    const { gramSlider } = this.state.currentStep.components;
    if (gramSlider) {
      this.setState({
        grams: gramSlider.min,
        bloomWater: gramSlider.min * currentRecipe.bloomMultiplier,
        pourWater: gramSlider.min * currentRecipe.pourMultiplier,
        iceWater: gramSlider.min * currentRecipe.iceWaterMultiplier
      });
    }
  }

  setGrams = v => {
    const {
      bloomMultiplier,
      pourMultiplier,
      iceWaterMultiplier
    } = this.props.currentRecipe;
    this.setState({
      grams: v,
      bloomWater: v * bloomMultiplier,
      pourWater: v * pourMultiplier,
      iceWater: v * iceWaterMultiplier
    });
  };

  advanceStep = () => {
    const stepIndex = Number(this.state.stepIndex) + 1;

    // If last step, toggle the summary next
    if (this.state.stepIndex === this.state.lastStep) {
      this.toggleSummary();
    } else {
      // Advance to the next step
      this.setState(
        {
          stepIndex,
          currentStep: this.props.currentRecipe.steps[stepIndex]
        },
        () => {
          // Then set up the gramslider
          if (this.state.stepIndex <= this.state.lastStep) {
            this.initializeGramSlider();
          } else {
            this.setState({
              summaryVisible: true
            });
          }
        }
      );
    }
  };

  goToStep = e => {
    let step = e.target.attributes.value.nodeValue;
    this.setState(
      {
        stepIndex: step,
        currentStep: this.props.currentRecipe.steps[step]
      },
      () => {
        // Sets up gramslider
        this.initializeGramSlider();
      }
    );
  };

  toggleSummary() {
    this.setState(prevState => ({ summaryVisible: !prevState.summaryVisible }));
  }

  interpolateGrams(instruction) {
    return instruction.replace(/\$\{.*\}/, match =>
      Math.round(this.state[match.slice(2, match.length - 1)])
    );
  }

  render() {
    const { currentStep, grams, pourWater } = this.state;
    const interpolatedSummary = this.interpolateGrams(currentStep.summary);
    const interpolatedInstruction = this.interpolateGrams(
      currentStep.instructions
    );

    return this.state.summaryVisible ? (
      <SummaryContainer
        grams={this.state.grams}
        recipe={this.props.currentRecipe}
        toggleMenu={this.props.toggleMenu}
      />
    ) : (
      <div>
        <div className="displayHorizontal">
          <Step
            title={currentStep.title}
            summary={interpolatedSummary}
            instructions={interpolatedInstruction}
            image={currentStep.image}
            emptyComponent={isEmpty(currentStep.components)}
          />
          {!isEmpty(currentStep.components) ? (
            <ComponentContainer
              currentStep={currentStep}
              pourWater={pourWater}
              currentGrams={grams}
              setGrams={this.setGrams}
              advanceStep={this.advanceStep}
            />
          ) : null}
        </div>
        <Nav
          nextStep={this.advanceStep}
          toggleMenu={this.props.toggleMenu}
          recipe={this.props.currentRecipe}
          currentStep={this.state.stepIndex}
          goToStep={this.goToStep}
        />
      </div>
    );
  }
}
