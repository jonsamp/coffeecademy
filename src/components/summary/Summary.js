import React from 'react';
import s from './index.scss';
import slackMark from '../../images/Slack_Mark.svg';

const Summary = ({
  toggleMenu,
  grams,
  recipe,
  fact,
  sendMessageToSlack,
  slackSent,
  brewIcons
}) => {
  let slackButton = (
    <div className={s.slackButton} onClick={sendMessageToSlack}>
      <span>
        <img src={slackMark} /> Slack #caffeinators
      </span>
    </div>
  );

  if (slackSent) {
    slackButton = (
      <div className={s.slackButton} style={{ opacity: '0.75' }}>
        <span>
          <img src={slackMark} /> Sent!
        </span>
      </div>
    );
  }

  return (
    <div className={s.summaryWrapper}>
      <div className={s.summary}>
        <img src={brewIcons[recipe.icon]} />
        <h1>{`Enjoy the ${recipe.method}!`}</h1>
        <p>
          {grams
            ? `You made ${grams} delicious grams of craft coffee.`
            : 'You made some coffee!'}
        </p>
        <p>
          {fact ? `Fact: ${fact}` : ''}
        </p>
      </div>
      <div className={s.buttons}>
        {slackButton}
        <div className={s.menu} onClick={toggleMenu}>
          Menu
        </div>
      </div>
    </div>
  );
};

export default Summary;
