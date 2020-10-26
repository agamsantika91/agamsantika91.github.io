function showTopScorer(data) {
    let topScorerHTML = "";
    const topScorerElement = document.getElementById("topScorer")

    data.scorers.forEach(data => {
        topScorerHTML += `
            <tr>
                <td>${data.player.name}</td>
                <td>${data.team.name}</td>
                <td>${data.numberOfGoals}</td>
            </tr>
             `;
    });
    document.getElementById('progress').style.display = 'none'
    topScorerElement.innerHTML = `
    <div class="row center-align">
    <table class="centered">
        <thead class="pink accent-5 white-text">
            <tr class="z-depth-3">
                        <th>Player</th>
                        <th>Team Name</th>
                        <th>Goals</th>
                    </tr>
                </thead>
                <tbody>
                    ${topScorerHTML}
                </tbody>
            </table>
            </div>
            `
}

export default showTopScorer;