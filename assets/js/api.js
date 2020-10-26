import showStanding from "./content/standing.js";
import { showTeams, showTeamById } from "./content/teams.js";
import showTopScorer from "./content/topScorer.js";
import {showLikedTeams, showLikedTeamById} from "./content/favTeams.js";
import { dbGetAllTeam, getById} from "./db.js";
import {showMatches} from "./content/matches.js";


const API_KEY = "aeaafb2508b34d9e8d09cee262a9ebb1";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2019;
const TEAMS =   `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const STANDINGS = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const SKORER = `${BASE_URL}competitions/SA/scorers`;
const MATCH = `${BASE_URL}competitions/${LEAGUE_ID}/matches`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(error => {
            console.log("Error :" + error);
        });
};

function getAllStandings() {
    if ("caches" in window) {
        caches
        .match(STANDINGS)
        .then(response => {
            if (response) {
                response.json().then( data => {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                });
            }
        });
    }

    fetchAPI(STANDINGS)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getTopScorer() {
    if ("caches" in window) {
        caches
            .match(SKORER)
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        console.log("Competition Data: " + data);
                        showTopScorer(data);
                    })
                }
            })
    }

    fetchAPI(SKORER)
        .then(data => {
            showTopScorer(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getAllTeams() {
    if ("caches" in window) {
        caches
        .match(TEAMS)
        .then( response => {
            if (response) {
                response.json().then(data => {
                    showTeams(data);
                });
            }
        });
    }

    fetchAPI(TEAMS)
        .then(data => {
            showTeams(data);
        })
        .catch(error => {
            console.log(error)
        });
}

function getTeamById() {
    return new Promise( (resolve, reject) => {
        
        // Ambil nilai query parameter (?id=)
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
    
        if ("caches" in window) {
            caches
                .match(BASE_URL + "teams/" + idParam)
                .then(response => {
                    if (response) {
                        response.json().then(data => {
                            console.log("Competition Data: " + data);
                            showTeamById(data);
                        });
                    }
                });
        }
    
        fetchAPI(BASE_URL + "teams/" + idParam)
            .then(data => {
                showTeamById(data);

                resolve(data);
            })
            .catch(error => {
                console.log(error)
            });
    });
    
}

function getLikedTeams() {
    dbGetAllTeam().then(data => {
        showLikedTeams(data);
        
    });
}

function getLikedTeamById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const id = parseInt(idParam);

    getById(id).then(data => {
        showLikedTeamById(data);
        
    });
}

//tampil match
function getAllMatches() {
    if ("caches" in window) {
        caches.match(MATCH).then(response => {
            if (response) {
                response.json().then(data => {
                    showMatches(data);
                });
            }
        });
    }

    fetchAPI(MATCH)
        .then(data => {
            showMatches(data);
        })
        .catch(error => {
            console.log(error)
        });
}

export { 
    getAllStandings, 
    getAllTeams, 
    getTopScorer, 
    getTeamById, 
    getLikedTeams, 
    getLikedTeamById,
    getAllMatches
};
