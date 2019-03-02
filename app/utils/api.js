var axios = require("axios")

var access_token = 'd3ac3ebe4b13d9c066afaf7e63097f134b54f874';
var params = '?access_token=' + access_token;


getProfile = username => axios.get('https://api.github.com/users/' + username + params).then((user) => user.data);

getRepos = username => axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');

getStarCount = repos => repos.data.reduce((count, repo) => (count + repo.stargazers_count), 0);

function calculateScore (profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

handelError = error => {console.warn(error); return null}

getUserData = (player) =>
    axios.all([
        getProfile(player),
        getRepos(player),
    ])
        .then((data) => {
            var profile = data[0],
            repos = data[1];
            return {
                profile: profile,
                score: calculateScore(profile, repos)
            }
        })

sortPlayers = (players) => {
    players.sort((a, b) => (b.score - a.score))
    return players
};

module.exports = {
    battle: (players) => 
        axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handelError),
    fetchPopularRepos: (language) => {
        var encodedURL = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURL).then(response => response.data.items)
    }
}
