require('rc-slider/assets/index.css');
import React from 'react';
import styles from './index.scss';
import Slider from 'rc-slider';

const GramSlider = ({ setGrams, currentGrams, min, max, gramsPerCup }) => {
  function cupFormatter(v) {
    // Displays # of cups on gram slider popover
    if (Math.round(v / gramsPerCup) === 1) {
      return `${Math.round(v / gramsPerCup)} cup`;
    } else {
      return `${Math.round(v / gramsPerCup)} cups`;
    }
  }

  return (
    <div className={styles.gramSlider}>
      <h1>
        {currentGrams}
      </h1>
      <h3>GRAMS</h3>
      <Slider
        min={min}
        max={max}
        onChange={setGrams}
        tipFormatter={cupFormatter}
        tipTransitionName="rc-slider-tooltip-zoom-down"
        included={true}
        className={styles.slider}
      />
    </div>
  );
};

export default GramSlider;
