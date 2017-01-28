import React from 'react'
import Clock from '../components/instructions/Clock'
import Sound from 'react-sound'

export default class CountdownTimer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      secondsRemaining: 0,
      interval: null,
      seconds: props.seconds,
      timerRunning: false,
      play: Sound.status.PAUSED
    }
  }

  countdown = () => {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 1
    })

    this.percentComplete()

    if (this.state.secondsRemaining <= 0) {
      this.setState({ play: Sound.status.PLAYING })
      clearInterval(this.interval);

      // When the timer is finished, call this:
      this.props.advanceStep();
    }

    return this.state.secondsRemaining
  }

  startCountdown = () => {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true })
      this.interval = setInterval(this.countdown, 1000)
    } else {
      this.setState({ timerRunning: false })
      clearInterval(this.interval)
    }
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

  percentComplete() {
    let percent = (1 - ((this.state.secondsRemaining )/ this.props.seconds)) * 100
    return percent
  }

  onFinishedPlaying = () => {
    this.setState({ play: Sound.status.PAUSED })
  }

  componentDidMount() {
    clearInterval(this.interval)
    this.setState({
      secondsRemaining: this.props.seconds
    })
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.interval)
    this.setState({
      secondsRemaining: nextProps.seconds,
      timerRunning: false
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
      <Clock time={this.formatSeconds(this.state.secondsRemaining)} percent={this.percentComplete()} startTimer={this.startCountdown} timerRunning={this.state.timerRunning}/>
          <Sound url={'https://s3.amazonaws.com/coffeecademy/ding.mp3'} playStatus={this.state.play} onFinishedPlaying={this.onFinishedPlaying}/>
        </div>
      )
  }
}
