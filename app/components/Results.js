import React, { Component } from 'react';
import { battle } from "../utils/api";
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';
import queryString from "query-string";
import { Link } from "react-router-dom";

function Profile({ info }){
  const {avatar_url, login, name, location, company, followers, following, public_repos, blog} = info;
  return (
    <PlayerPreview avatar={avatar_url} username={login} >
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player({ label, score, profile}){
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
}

export default class Results extends Component {
  state = {
    error: null,
    loading: true,
    winner: null,
    loser: null,
  }

  async componentDidMount(){
    const {playerOneName, playerTwoName} = queryString.parse(this.props.location.search);

    const players = await battle([playerOneName, playerTwoName]);

    if (players == null)
      return this.setState(() => ({
        error: 'Cannot find both two players',
        loading: 'false'
      }))

    this.setState(() => ({
      winner: players[0],
      loser: players[1],
      error: null,
      loading: false
    }))
  }

  render() {
    const {error, loading, winner, loser} = this.state;
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
