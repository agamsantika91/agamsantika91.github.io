function showMatches(data) {
    let matches = "";
    let matchElement = document.getElementById("match");

    data.matches.forEach(function (match) {
        matches += `
            <div class="col s12 m6">
                <div class="card"> 
                    <div class="card-content blue-grey darken-4 white-text center">
                        <h5>Matchday ${match.matchday} of 38</h5>
                    </div>
                    <div class="card-action row center">
                        <div class="col s5">
                            <p>
                                ${match.homeTeam.name}<br>
                                ${match.score.fullTime.homeTeam}
                            </p>
                        </div>
                        <div class="col s2">
                            <h5>VS</h5>
                        </div>
                        <div class="col s5">
                            <p>
                                ${match.awayTeam.name}<br>
                                ${match.score.fullTime.awayTeam}
                            </p>
                        </div>
                    </div>
                    <div class="card-action row center">
                        <h5>${dmy(new Date(match.utcDate))}</h5>
                    </div>
                </div>
            </div>
        `;
    });

    matchElement.innerHTML = `
        <div class="row">
            ${matches}
        </div>
    `;
}

function dmy(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export {showMatches};