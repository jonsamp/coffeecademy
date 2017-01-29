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

  constructor() {
    super()
  }

  state = {
    fact: ''
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('coffee')

    rootRef.push({
      grams: this.props.grams,
      timeStamp: (new Date()).getTime(),
      method: this.props.recipe.method
    })

    rootRef.on('value', snap => {
      let coffeeLog = snap.val()
      let keys = Object.keys(coffeeLog)
      let totalGrams = 0

      keys.forEach((key) => {
        totalGrams = totalGrams + (coffeeLog[key].grams)
      })

      this.setState({
        fact: `To date, ${(totalGrams * 0.00220462).toFixed(2)} pounds of coffee have been brewed`
      })

    })
  }

  render() {
    return (
      <Summary toggleMenu={this.props.toggleMenu} grams={this.props.grams} recipe={this.props.recipe} fact={this.state.fact}/>
    )
  }
}
