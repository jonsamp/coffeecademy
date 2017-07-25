import React, { Component } from 'react';
import Clock from '../components/instructions/Clock';

class CountdownTimer extends Component {
  state = {
    secondsRemaining: 0,
    interval: null,
    seconds: this.props.seconds,
    timerRunning: false
  };

  countdown = () => {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 1
    });

    this.percentComplete();

    if (this.state.secondsRemaining <= 0) {
      // Ding when the timer is finished
      // let audio = new Audio('https://s3.amazonaws.com/coffeecademy/ding.mp3')
      // audio.play()

      // Clear the countdown interval
      clearInterval(this.interval);

      // When the timer is finished, call this:
      this.props.advanceStep();
    }

    return this.state.secondsRemaining;
  };

  startCountdown = () => {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      this.interval = setInterval(this.countdown, 1000);
    } else {
      this.setState({ timerRunning: false });
      clearInterval(this.interval);
    }
  };

  formatSeconds(time) {
    // Minutes and seconds
    var mins = ~~(time / 60);
    var secs = time % 60;

    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~(time % 3600 / 60);
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

  percentComplete() {
    let percent = (1 - this.state.secondsRemaining / this.props.seconds) * 100;
    return percent;
  }

  componentDidMount() {
    clearInterval(this.interval);
    this.setState({
      secondsRemaining: this.props.seconds
    });
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.interval);
    this.setState({
      secondsRemaining: nextProps.seconds,
      timerRunning: false
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Clock
        time={this.formatSeconds(this.state.secondsRemaining)}
        percent={this.percentComplete()}
        startTimer={this.startCountdown}
        timerRunning={this.state.timerRunning}
      />
    );
  }
}

export default CountdownTimer;
