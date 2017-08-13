import React from 'react';
import styles from './index.scss';

const Nav = ({ nextStep, toggleMenu, recipe, currentStep, goToStep }) => {
  console.log(recipe);
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
    <div className={styles.nav}>
      <div className={styles.actionBar}>
        <div
          onClick={toggleMenu}
          className={[styles.button, styles.menu].join(' ')}
        >
          <img src="../../images/hamburger.svg" />
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
    </div>
  );
};

export default Nav;
