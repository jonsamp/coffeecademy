import React from 'react';
import { repeat } from 'lodash';
import firebase from 'firebase';
import Summary from '../components/summary/Summary';
import factsList from '../data/facts';

// Coffee icons
import chemex from '../images/chemex.svg';
import aeropress from '../images/aeropress.svg';
import pourOver from '../images/pourOver.svg';
import percolator from '../images/percolator.svg';
import icedChemex from '../images/iced-chemex.svg';

const config = {
  apiKey: 'AIzaSyDnVcd1NckRvX8fw52wNNPz_V7kcgYERhA',
  authDomain: 'coffeecademy.firebaseapp.com',
  databaseURL: 'https://coffeecademy.firebaseio.com',
  storageBucket: 'coffeecademy.appspot.com',
  messagingSenderId: '1092990509818'
};

firebase.initializeApp(config);

export default class SummaryContainer extends React.Component {
  state = {
    fact: '',
    slackSent: false,
    timeout: null
  };

  brewIcons = {
    chemex,
    aeropress,
    pourOver,
    percolator,
    icedChemex
  };

  componentDidMount() {
    const rootRef = firebase.database().ref().child('coffee');
    const getRandomNumber = arr => Math.floor(Math.random() * arr.length);
    const catEmojis = ['😺', '😸', '😹', '😻', '😼', '🙀', '🐱', '🐈'];

    // Save details in firebase
    rootRef.push({
      grams: this.props.grams,
      timeStamp: new Date().getTime(),
      method: this.props.recipe.method
    });

    // Generate a random fact
    let fact = `${factsList[getRandomNumber(factsList)]} ${catEmojis[
      getRandomNumber(catEmojis)
    ]}`;

    this.setState({
      fact: fact
    });

    // Goes back to the menu after 1 minute
    this.setState({
      timeout: setTimeout(() => {
        this.props.toggleMenu();
      }, 60000)
    });
  }

  componentWillUnmount() {
    // Stop the timeout if this component unmounts
    clearTimeout(this.state.timeout);
  }

  sendMessageToSlack = () => {
    let payload = {
      username: 'caffeine-bot',
      icon_emoji: ':coffee:',
      channel: '#caffeinators',
      text: `
        Fresh ${this.props.recipe.method}! ${repeat(
        '☕️',
        this.props.grams / 16 + 1
      )}${this.state.fact ? `\nFact: ${this.state.fact}` : ''}`
    };

    let xmlhttp = new XMLHttpRequest(),
      webhook_url =
        'https://hooks.slack.com/services/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',
      myJSONStr = JSON.stringify(payload);
    xmlhttp.open('POST', webhook_url, false);
    xmlhttp.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    xmlhttp.send(myJSONStr);

    this.setState({
      slackSent: true
    });
  };

  render() {
    return (
      <Summary
        toggleMenu={this.props.toggleMenu}
        grams={this.props.grams}
        recipe={this.props.recipe}
        fact={this.state.fact}
        sendMessageToSlack={this.sendMessageToSlack}
        slackSent={this.state.slackSent}
        brewIcons={this.brewIcons}
      />
    );
  }
}
