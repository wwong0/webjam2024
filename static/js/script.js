document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
/*
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

            })
    })
*/

    const dayCols = document.querySelectorAll('.day-col');
    let selectedDay = null
    dayCols.forEach(function (dayCol) {
        dayCol.addEventListener('click', function () {
            if (dayCol.classList.contains('day-selected')) {
                dayCol.classList.remove('day-selected')
            } else {
                dayCols.forEach(function (day) {
                    day.classList.remove('day-selected');
                });
                dayCol.classList.add('day-selected');
            }

            selectedDay = document.querySelector('.day-col .day-selected');
        })
    });


    const mealButtons = document.querySelectorAll('.meal-button');
    let activeMealButton = null;
    mealButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (button.classList.contains('active')) {
                button.classList.remove('active')
            } else {
                mealButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            }
            activeMealButton = document.querySelector('.meal-button .active');
        });
    });

    function loadResults(data){
        const searchResultsDiv = document.querySelector('.search-results');
        data.forEach(function(item){
            const searchResultDiv = document.createElement('div');
            searchResultDiv.classList.add('search-result');

            const resultTitle = document.createElement('h5');
            resultTitle.textContent = item['Meal'];

            const resultDescription = document.createElement('p');
            resultDescription.classList.add('mb-0');
            resultDescription.textContent = item['Description'];

            const caloriesSpan = document.createElement('span');
            caloriesSpan.classList.add('calories-item');
            caloriesSpan.textContent = item['Calories'];

            searchResultDiv.appendChild(resultTitle);
            searchResultDiv.appendChild(resultDescription);
            searchResultDiv.appendChild(caloriesSpan);
        });


    return searchResultDiv;
    }



});