var React = require("react"),
api = require("../utils/api");
import PropTypes from 'prop-types';
import Loading from './Loading';

function SelectedLanguage(props){
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {languages.map(lang => 
                <li
                    style={lang === props.selectedLanguage? { color : "#d0021b" }: null}
                    onClick={() => props.updateLanguage(lang)}
                    key={lang}>
                    {lang}
                </li>
            )}
        </ul>
    )
}

SelectedLanguage.prototype = {
    selectedLanguage: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired
}

function RepoGrid(props){
    return(
        <ul className="popular-list">
            {props.repos.map((repo, index) => { return(
                <li key={repo.name} className='popular-item'>
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                          <img
                            className='avatar'
                            src={repo.owner.avatar_url}
                            alt={'Avatar for ' + repo.owner.login}
                          />
                        </li>
                        <li><a href={repo.html_url}>{repo.name}</a></li>
                        <li>@{repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>
                    </ul>
                </li>
            )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor(props){
        super();
        this.state = {
            selectedLanguage : 'All',
            repos: null,
        }
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = (lang) => {
        this.setState({
            selectedLanguage: lang,
            repos: null,
        })
        api.fetchPopularRepos(lang).then(repos => this.setState({repos: repos}))
    }

    render(){
        return (
            <div>
                <SelectedLanguage 
                selectedLanguage={this.state.selectedLanguage} 
                updateLanguage={this.updateLanguage} />
                {this.state.repos?
                    <RepoGrid repos={this.state.repos} />:
                    <Loading text='Downloading' />}
            </div>
        )
    }
}

export default Popular