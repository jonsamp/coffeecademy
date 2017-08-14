import React from 'react';
import styles from './index.scss';
import hamburger from '../../images/hamburger.svg';

const Nav = ({ nextStep, toggleMenu, recipe, currentStep, goToStep }) => {
  const stepTitle = () => {
    return recipe.steps.map((step, index) => {
      if (index === currentStep) {
        return (
          <span>
            {currentStep + 1}/{recipe.steps.length}: {step.title}
          </span>
        );
      }
    });
  };

  return (
    <div className={styles.actionBar}>
      <div
        onClick={toggleMenu}
        className={[styles.button, styles.menu].join(' ')}
      >
        <img src={hamburger} />
      </div>
      <div className={styles.stepProgress}>
        {stepTitle()}
      </div>
      <div
        onClick={nextStep}
        className={[styles.button, styles.next].join(' ')}
      >
        Next
      </div>
    </div>
  );
};

export default Nav;
