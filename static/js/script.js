document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    let debounceTimeout;

    const query = {
        'search_term': '',
        'date': null,
        'hall': null,
        'vegan': null,
        'vegetarian': null,
        'search_order': null
    };
    fetch('/fuzz_search', {
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
            loadResults(data); // Call to load results when data is returned
        });

    searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function () {
            const query = {
                'search_term': searchInput.value,
                'date': null,
                'hall': null,
                'vegan': null,
                'vegetarian': null,
                'search_order': null
            };
            fetch('/fuzz_search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: query })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    loadResults(data);
                });
        }, 300); // Debounce timeout of 300ms
    });

    // Event listeners for day selection
    const dayCols = document.querySelectorAll('.day-col');
    let selectedDay = null;
    dayCols.forEach(function (dayCol) {
        dayCol.addEventListener('click', function () {
            if (dayCol.classList.contains('day-selected')) {
                dayCol.classList.remove('day-selected');
            } else {
                dayCols.forEach(function (day) {
                    day.classList.remove('day-selected');
                });
                dayCol.classList.add('day-selected');
            }

            selectedDay = document.querySelector('.day-col .day-selected');
        });
    });

    // Event listeners for meal button selection
    const mealButtons = document.querySelectorAll('.meal-button');
    let activeMealButton = null;
    mealButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
            } else {
                mealButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            }
            activeMealButton = document.querySelector('.meal-button .active');
        });
    });

    function loadResults(data ) {
        let searchResultsDiv = document.querySelector('.search-results');
        searchResultsDiv.innerHTML = '';

        data.forEach(function (item) {
            const searchResultDiv = document.createElement('div');
            searchResultDiv.classList.add('search-result');

            const resultTitle = document.createElement('h5');
            resultTitle.textContent = item['Item'];
            console.log(item)
            console.log(item['Item'])

            const resultDescription = document.createElement('p');
            resultDescription.classList.add('mb-0');
            resultDescription.textContent = item['Description'];

            const caloriesSpan = document.createElement('span');
            caloriesSpan.classList.add('calories-item');
            caloriesSpan.textContent = item['calories'] + 'kCal';

            searchResultDiv.appendChild(resultTitle);
            searchResultDiv.appendChild(resultDescription);
            searchResultDiv.appendChild(caloriesSpan);

            searchResultsDiv.appendChild(searchResultDiv);

        });
    }

});
