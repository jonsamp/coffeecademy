import React from 'react'
import styles from './index.scss'

const Nav = ({
  nextStep,
  toggleMenu,
  recipe,
  currentStep,
  goToStep
}) => {

  const stepsBreadCrumb = () => {
    let steps = recipe.steps.map((step, index) => {
      if (index <= currentStep) {
        return <div className={styles.active} key={index} onClick={goToStep} value={index}>{step.title}</div>;
      } else {
        return <div className={styles.inactive} key={index} onClick={goToStep} value={index}>{step.title}</div>;
      }
    })
    return <div className={styles.breadCrumb}>{steps}</div>
  }

  return (
    <div className={styles.nav}>
      <div onClick={toggleMenu} className={styles.button}>Menu</div>
        {stepsBreadCrumb()}
      <div onClick={nextStep} className={[styles.button, styles.next].join(' ')}>Next</div>
    </div>
  )
}

export default Nav
