import React, { Component } from 'react'
import PropTypes from 'prop-types'

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

export class Loading extends Component {
  constructor(props){
      super(props)

      this.state = {
          text: props.text,
          speed: props.speed,
      }
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
    var stopper = this.props.text + '...';
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper){
        this.setState({text: this.props.text})
      } else {
        this.setState((prevState) => ({text: prevState.text + '.'}))
      }
    }, this.props.speed);
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

export default Loading