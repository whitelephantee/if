document.addEventListener('DOMContentLoaded', function() {
    fetch('journals_cleaned.csv')
        .then(response => response.text())
        .then(data => {
            window.journalsData = processData(data);
        });
});

function processData(data) {
    const lines = data.split('\n');
    return lines.slice(1).map(line => {
        const columns = line.split(',');
        return {
            name: columns[0].trim(),
            abbreviation: columns[1].trim(),
            jifQuartile: columns[3].trim(),
            jif2021: columns[2].trim()
        };
    });
}

function searchJournal() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    const journal = window.journalsData.find(j => j.name.toLowerCase().includes(input) || j.abbreviation.toLowerCase().includes(input));
    if (journal) {
        resultDiv.innerHTML = `Journal name: ${journal.name} <br>Quartile: ${journal.jifQuartile} <br>Impact Factor: ${journal.jif2021}`;
    } else {
        resultDiv.innerHTML = 'The journal was not included yet.';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchJournal();
    }
}
