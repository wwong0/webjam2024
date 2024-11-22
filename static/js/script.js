document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value;

        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: query})
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                resultsDiv.innerHTML = '';


                data.matches.forEach(function (match) {
                    var p = document.createElement('p');
                    p.textContent = match;
                    resultsDiv.appendChild(p);
                });
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    });
});
