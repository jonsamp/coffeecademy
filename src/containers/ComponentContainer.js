import React from 'react';
import GramSlider from '../components/instructions/GramSlider';
import CountdownContainer from './CountdownContainer';
import s from './styles/CountdownContainer.scss';

export default class ComponentContainer extends React.Component {
  getComponent() {
    const {
      setGrams,
      currentGrams,
      currentStep: { components: { gramSlider, timer } },
      advanceStep,
      pourWater
    } = this.props;

    if (gramSlider) {
      return (
        <GramSlider
          setGrams={setGrams}
          currentGrams={currentGrams}
          min={gramSlider.min}
          max={gramSlider.max}
          gramsPerCup={gramSlider.gramsPerCup}
        />
      );
    } else if (timer) {
      let seconds = timer.seconds;

      if (timer.calculated) {
        seconds = Math.round(pourWater * 0.58);
      }

      return <CountdownContainer seconds={seconds} advanceStep={advanceStep} />;
    }
  }

  render() {
    return (
      <div className={s.countdownContainer}>
        {this.getComponent()}
      </div>
    );
  }
}
