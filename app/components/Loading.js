import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

export default class Loading extends Component {
  state = {
    text: this.props.text,
    speed: this.props.speed,
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
  }

  static defaultProps = {
      text: 'Loading',
      speed: 300,
  }

  componentDidMount(){
    const { text, speed } = this.props;
    var stopper = text + '...';
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({text: text}))
        : this.setState((prevState) => ({text: prevState.text + '.'}))
    }, speed);
  }

  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        <p style={styles.content}>
          {this.state.text}
        </p>
      </div>
    )
  }
}