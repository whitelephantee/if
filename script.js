document.addEventListener('DOMContentLoaded', function() {
    // Change the CSV file to the updated one
    fetch('journals_cleaned.csv')
        .then(response => response.text())
        .then(data => {
            window.journalsData = processData(data);
        });
});

function processData(data) {
    const lines = data.split('\n').filter(line => line.trim());
    return lines.slice(1).map(line => {
        const columns = line.split(',');
        return {
            name: columns[0] ? columns[0].trim() : '',
            jif: columns[1] ? columns[1].trim() : 'N/A',
            
            jif5Years: columns[2] ? columns[2].trim() : 'N/A',
            fiveYearJifQuartile: columns[3] ? columns[3].trim() : 'N/A',
            jifWithoutSelfCites: columns[4] ? columns[4].trim() : 'N/A',
            immediacyIndex: columns[5] ? columns[5].trim() : 'N/A'
        };
    });
}


function searchJournal() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    const journal = window.journalsData.find(j => j.name.toLowerCase().includes(input));
    if (journal) {
        resultDiv.innerHTML = `Journal Name: ${journal.name} <br>
                               Impact Factor: ${journal.jif} <br>
                               5-Year Impact Factor: ${journal.jif5Years} <br>
                               5-Year Journal Quartile: ${journal.fiveYearJifQuartile} <br>
                               Impact Factor Without Self Cites: ${journal.jifWithoutSelfCites} <br>
                               Immediacy Index: ${journal.immediacyIndex}`;
    } else {
        resultDiv.innerHTML = 'The journal was not found.';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchJournal();
    }
}
