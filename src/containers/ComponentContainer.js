import React from 'react'
import GramSlider from '../components/instructions/GramSlider'

export default class ComponentContainer extends React.Component {

  getComponent() {

    let component = this.props.currentStep.components

    if (component.gramSlider) {
      let slider = component.gramSlider
      return <GramSlider setGrams={this.props.setGrams} currentGrams={this.props.currentGrams} min={slider.min} max={slider.max} gramsPerCup={slider.gramsPerCup} />
    } else if (component.timer) {
      return <h1 style={{color: 'white', fontSize: '7rem', lineHeight: '1'}}>0:00</h1>
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
