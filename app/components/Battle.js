import PlayerPreview from './PlayerPreview'

var React = require("react"),
Link = require("react-router-dom").Link;

import PropTypes from 'prop-types';

class PlayerInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: ""
        }
    }

    handleChange = (event) => {
        var value = event.target.value;
        this.setState({username: value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render(){
        return(
            <form className="column" onSubmit={this.handleSubmit} >
                <label className="header" htmlFor="username">
                    {this.props.label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                <button 
                    className="button"
                    type="submit"
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playerOneName: "",
            playerTwoName: "",
            playerOneImage: null,
            playerTwoImage: null
        }
    }

    handleSubmit = (id, username) => {
        var newState = {};
        newState[id + 'Name'] = username;
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
        this.setState(newState);
    }

    handleReset = (id) => {
        var newState = {};
        newState[id + 'Name'] = '';
        newState[id + 'Image'] = null; 
        this.setState(newState);
    }

    render(){
        var playerOneName = this.state.playerOneName,
        playerTwoName = this.state.playerTwoName,
        playerOneImage = this.state.playerOneImage,
        playerTwoImage = this.state.playerTwoImage,
        match = this.props.match;

        return(
            <div>
                <div className="row">
                    {!playerOneName &&
                        <PlayerInput 
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}
                    />
                    }

                    {playerOneImage !== null && 
                        <PlayerPreview
                        avatar={playerOneImage}
                        username={playerOneName}>
                            <button className='reset' onClick={() => this.handleReset('playerOne')}>
                                Reset
                            </button>
                        </PlayerPreview>
                    }

                    {!playerTwoName &&
                        <PlayerInput 
                        id='playerTwo'
                        label='Player Two'
                        onSubmit={this.handleSubmit}
                    />
                    }  

                    {playerTwoImage !== null && 
                        <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}>
                            <button className='reset' onClick={() => this.handleReset('playerTwo')}>
                                Reset
                            </button>
                        </PlayerPreview>
                    }        
                </div>
                {playerOneImage && playerTwoImage &&
                    <Link
                        className="button"
                        to={{
                            pathname: match.url + '/results',
                            search: "?playerOneName=" + playerOneName + "&playerTwoName=" + playerTwoName
                        }}>
                        Battle
                    </Link>
                }

            </div>
        )
    }
}

export default Battle