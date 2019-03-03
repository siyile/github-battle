const access_token = require("./config").ACCESS_TOKEN;
const params = '?access_token=' + access_token;


const getProfile = async username => {
    const response = await fetch(`https://api.github.com/users/${username + params}`); 
    return response.json()
} 

const getRepos = async username => {
    const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
    return response.json()
} 

const getStarCount = repos => repos.reduce((count, {stargazers_count}) => (count + stargazers_count), 0);

const calculateScore = ({followers}, repos) => (followers * 3) + getStarCount(repos)

const handelError = error => {console.warn(error); return null}

const getUserData = async player => {
    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player),
    ])

    return ({
            profile,
            score: calculateScore(profile, repos)
        })
    }

const sortPlayers = players => players.sort((a, b) => (b.score - a.score))

export async function battle(players){
    let results = await Promise.all(players.map(getUserData)).catch(handelError);
    return results === null
    ? results
    : sortPlayers(results)
}


export async function fetchPopularRepos(language){
    const encodedURL = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const response = await fetch(encodedURL).catch(handelError);
    const repos = await response.json();
    return repos.items
}
