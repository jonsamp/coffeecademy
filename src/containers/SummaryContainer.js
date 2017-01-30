import React from 'react'
import Summary from '../components/summary/Summary'

import firebase from 'firebase'

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
    slackSent: false
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('coffee')

    rootRef.push({
      grams: this.props.grams,
      timeStamp: (new Date()).getTime(),
      method: this.props.recipe.method
    })

    rootRef.on('value', snap => {

      let facts = [
        this.calcTotalWeight,
        this.calcAverageTime
      ]

      // Generate a random fact
      let randomNumber = Math.floor(Math.random() * facts.length)
      let fact = facts[randomNumber](snap.val())
      this.setState({
        fact: fact
      })
    })

    // Goes back to the menu after 1 minute
    setTimeout(() => { this.props.toggleMenu() }, 60000)
  }

  calcTotalWeight = (data) => {
    let keys = Object.keys(data)
    let totalGrams = 0

    keys.forEach((key) => {
      totalGrams = totalGrams + (data[key].grams)
    })

    return `Added all up, we've brewed a total of ${(totalGrams * 0.00220462).toFixed(2)} pounds of coffee with coffeecademy.`
  }

  calcAverageTime = (data) => {
    let keys = Object.keys(data)
    let times = []
    keys.forEach((key) => {
      times.push(data[key].timeStamp)
    })

    let sortedTimes = times.sort((a, b) => {
      return a - b
    })

    let medianTime = sortedTimes[Math.round(sortedTimes.length / 2)]
    let date = new Date(Math.floor(medianTime))

    let time

    if (/\:/.exec(date.toLocaleTimeString().slice(0,2))) {
      time = date.toLocaleTimeString().slice(0,4) + date.toLocaleTimeString().slice(8,10)
    } else {
      time = date.toLocaleTimeString().slice(0,5) + date.toLocaleTimeString().slice(9,11)
    }

    return `The most popular time to make craft coffee is ${time}. 💅🏻`
  }

  sendMessageToSlack = () => {
    let payload = {
      'username': 'coffee-bot',
      'icon_emoji': ':coffee:',
      'channel': '#caffeinators',
      'text': `Fresh ${this.props.recipe.method}! (approx. ${Math.round(this.props.grams / 16) } - ${Math.round(this.props.grams / 16) + 1} cups)`
    }

    let xmlhttp = new XMLHttpRequest(),
        webhook_url = 'https://hooks.slack.com/services/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',
        myJSONStr= JSON.stringify(payload);
    xmlhttp.open('POST', webhook_url, false);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(myJSONStr);

    this.setState({
      slackSent: true
    })
  }

  render() {
    return (
      <Summary toggleMenu={this.props.toggleMenu} grams={this.props.grams} recipe={this.props.recipe} fact={this.state.fact} sendMessageToSlack={this.sendMessageToSlack} slackSent={this.state.slackSent}/>
    )
  }
}
