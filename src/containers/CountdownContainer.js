import React from 'react'
import Clock from '../components/instructions/Clock'

export default class CountdownTimer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      secondsRemaining: 0,
      interval: null,
      seconds: props.seconds
    }
  }

  countdown = () => {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 1
    })

    this.percentComplete()

    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);

      // When the timer is finished, call this:
      this.props.advanceStep();
    }

    return this.state.secondsRemaining
  }

  formatSeconds(time) {
      // Minutes and seconds
    var mins = ~~(time / 60);
    var secs = time % 60;

    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like '1:01' or '4:03:59' or '123:03:59'
    var ret = '';

    if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  startCountdown() {

    if (this.interval) {
      clearInterval(this.interval)
    }

    this.setState({
      secondsRemaining: this.props.seconds
    })

    this.interval = setInterval(this.countdown, 1000)
  }

  percentComplete() {

    let percent = (1 - ((this.state.secondsRemaining )/ this.props.seconds)) * 100
    return percent
  }

  componentDidMount() {
    this.setState({
      secondsRemaining: this.props.seconds
    }, () => {
      this.startCountdown()
    })
  }

  componentWillReceiveProps() {
    clearInterval(this.interval)
    this.setState({
      secondsRemaining: this.props.seconds
    }, () => {
      this.startCountdown()
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <Clock time={this.formatSeconds(this.state.secondsRemaining)} percent={this.percentComplete()} />
  }
}
