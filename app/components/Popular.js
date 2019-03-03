import React from "react"
import { fetchPopularRepos } from "../utils/api"
import PropTypes from 'prop-types'
import Loading from './Loading'

function SelectedLanguage(props){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
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

function RepoGrid({ repos }){
    return(
        <ul className="popular-list">
            {repos.map(({ 
                name, 
                stargazers_count, 
                owner: {avatar_url, html_url, login}
            }, index) => (
                <li key={name} className='popular-item'>
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                          <img
                            className='avatar'
                            src={avatar_url}
                            alt={'Avatar for ' + login}
                          />
                        </li>
                        <li><a href={html_url}>{name}</a></li>
                        <li>@{login}</li>
                        <li>{stargazers_count} stars</li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    state = {
        selectedLanguage : 'All',
        repos: null,
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = async (lang) => {
        this.setState(() => ({
            selectedLanguage: lang,
            repos: null,
        }))
        const repos = await fetchPopularRepos(lang)
        this.setState(() => ({ repos }))
    }

    render(){
        const { selectedLanguage, repos } = this.state;
        return (
            <div>
                <SelectedLanguage 
                selectedLanguage={selectedLanguage} 
                updateLanguage={this.updateLanguage} />
                {repos?
                    <RepoGrid repos={repos} />:
                    <Loading text='Downloading' />}
            </div>
        )
    }
}

export default Popular