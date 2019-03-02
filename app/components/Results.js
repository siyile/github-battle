import React, { Component } from 'react'
import api from "../utils/api"
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';
var queryString = require("query-string"),
Link = require("react-router-dom").Link;

function Profile(props){
  var info=props.info;
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login} >
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player(props){
  return (
    <div>
      <h1 className="header">{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
}

export default class Results extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      loading: true,
      winner: null,
      loser: null,
    }
  }

  componentDidMount(){
    var players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneName, players.playerTwoName])
      .then(players => {
        if (players == null)
          return this.setState(() => ({
            error: 'Cannot find both two players',
            loading: 'false'
          }))

        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      })
  }

  render() {
    var error = this.state.error,
    loading = this.state.loading,
    winner = this.state.winner,
    loser = this.state.loser;
    if (loading == true)
      return <Loading />

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">
            Reset
          </Link>
        </div>
      )
    }

    return (
      <div className="row">
        <Player
          label='Winner'
          profile={winner.profile}
          score={winner.score}
        />

        <Player 
          label='Loser'
          profile={loser.profile}
          score={loser.score}
        />
      </div>
    )
  }
}
