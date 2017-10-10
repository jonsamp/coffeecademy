import React from 'react';
import GramSlider from '../components/instructions/GramSlider';
import Image from '../components/instructions/Image';
import CountdownContainer from './CountdownContainer';
import s from './styles/CountdownContainer.scss';

export default class ComponentContainer extends React.Component {
  getComponent() {
    const {
      setGrams,
      currentGrams,
      currentStep: { components: { gramSlider, timer, image } },
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
        seconds = Math.round(pourWater * timer.pourRate);
      }

      return <CountdownContainer seconds={seconds} advanceStep={advanceStep} />;
    } else if (image) {
      return <Image src={image} />;
    }
  }

  render() {
    return <div className={s.countdownContainer}>{this.getComponent()}</div>;
  }
}
