import React from 'react'
import GramSlider from '../components/instructions/GramSlider'
import CountdownContainer from './CountdownContainer'

export default class ComponentContainer extends React.Component {

  getComponent() {

    let component = this.props.currentStep.components

    if (component.gramSlider) {
      let slider = component.gramSlider
      return <GramSlider setGrams={this.props.setGrams} currentGrams={this.props.currentGrams} min={slider.min} max={slider.max} gramsPerCup={slider.gramsPerCup} />

    } else if (component.timer) {
      return <CountdownContainer seconds={component.timer.seconds} advanceStep={this.props.advanceStep}/>
    }
  }

  render() {
    return (
      <div style={{backgroundColor: '#2B2B2B', height: '92vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        {this.getComponent()}
      </div>
    )
  }

}
