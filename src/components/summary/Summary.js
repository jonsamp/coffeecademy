import React from 'react'
import styles from './index.scss'
import slackMark from '../../images/Slack_Mark.svg'

import chemex from '../../images/chemex.svg'
import aeropress from '../../images/aeropress.svg'
import pourOver from '../../images/pourOver.svg'
import percolator from '../../images/percolator.svg'


const Summary = ({
  toggleMenu,
  grams,
  recipe,
  fact,
  sendMessageToSlack
}) => {

  let brewIcons = {
    chemex,
    aeropress,
    pourOver,
    percolator
  }

  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.summary}>
        <img src={brewIcons[recipe.icon]} />
        <h1>{`Enjoy the ${recipe.method}!`}</h1>
        <p>{`You made ${grams} delicious grams of craft coffee.`}</p>
        <p>Fact: {fact}</p>

      </div>
      <div className={styles.buttons}>
        <div className={styles.slackButton} onClick={sendMessageToSlack}>
          <span><img src={slackMark} /> Slack #caffeinators</span>
        </div>
        <div className={styles.menu} onClick={toggleMenu}>Menu</div>
      </div>
    </div>
  )
}

export default Summary
