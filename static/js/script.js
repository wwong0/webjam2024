document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.getElementById('searchInput');
    let debounceTimeout;

    let date = null
    let hall = null
    let vegan = null
    let meal_type = null
    let vegetarian = null
    let search_order = null
    let asc_desc = false

    search();

    function search() {

            const query = {
                'search_term': searchInput.value,
                'date': date,
                'hall': hall,
                'meal_type': meal_type,
                'vegan': vegan,
                'vegetarian': vegetarian,
                'search_order': search_order,
                'asc_desc': asc_desc
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
                    loadResults(data);
                });
        }


    searchInput.addEventListener('input', function(){
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function () {
        search()
        });
    });

    // Event listeners for day selection
    const dayCols = document.querySelectorAll('.day-col');
    let selectedDay = null;
    dayCols.forEach(function (dayCol) {
        dayCol.addEventListener('click', function () {
            if (dayCol.classList.contains('day-selected')) {
                dayCol.classList.remove('day-selected');
                date = null

            } else {
                dayCols.forEach(function (day) {
                    day.classList.remove('day-selected');
                });
                dayCol.classList.add('day-selected');
                date = dayCol.getAttribute('day');

            }
            search()
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
                meal_type = null

            } else {
                mealButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                    meal_type = null

                });
                button.classList.add('active');
                meal_type = button.id;

            }
            search()
            activeMealButton = document.querySelector('.meal-button .active');
        });
    });

    const advancedOptionsButton = document.querySelector('.advanced-search-button');
    const advancedOptions = document.querySelector('.advanced-search-options');
    advancedOptionsButton.addEventListener('click', toggleAdvancedOptions);
    toggleAdvancedOptions()

    function toggleAdvancedOptions() {
        const advancedOptionsChildren = advancedOptions.querySelectorAll('div');
        advancedOptionsChildren.forEach(function (element) {
            if (element.classList.contains('d-none')) {
                element.classList.remove('d-none');
            } else {
                element.classList.add('d-none');
            }
        });
    }

    const checkboxes = document.querySelectorAll('.form-check-input');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            let vegetarianCheckbox = document.getElementById('Vegetarian');
            let veganCheckbox = document.getElementById('Vegan');

            let vegetarian = vegetarianCheckbox.checked;
            let vegan = veganCheckbox.checked;

            search(vegetarian, vegan);
        });
    });


    const sort_select = document.getElementById('sortSelecter');
    sort_select.addEventListener('change', function () {
        let value = sort_select.value;
        if (value === 'None') {
            search_order = null
        } else {
            search_order = value;
        }
        search();
    })

    const hall_select = document.getElementById('hallSelecter');
    hall_select.addEventListener('change', function () {
        let value = hall_select.value;
        if (value === 'Both') {
            hall = null
        } else {
            hall = value;
        }
        search();
    })

    const ascButton = document.querySelector('.asc-desc-button');
    hall_select.addEventListener('click', function () {
        asc_desc = !asc_desc;
        const span = document.getElementById('asc_desc-icon');
        if (asc_desc) {
            span.classList.replace('a-solid fa-sort-down','fa-solid fa-sort-up')
        }else{
            span.classList.replace( 'fa-solid fa-sort-up', 'a-solid fa-sort-down')
        }
        search();
    })

    function loadResults(data) {
        let searchResultsDiv = document.querySelector('.search-results');
        searchResultsDiv.innerHTML = '';

        data.forEach(function (item) {
            const searchResultDiv = document.createElement('div');
            searchResultDiv.classList.add('search-result');

            const resultTitle = document.createElement('h5');
            resultTitle.textContent = item['Item'];


            const resultDescription = document.createElement('p');
            resultDescription.classList.add('mb-0');
            resultDescription.textContent = item['Description'];

            const caloriesSpan = document.createElement('span');
            caloriesSpan.classList.add('calories-item');
            caloriesSpan.textContent = item['calories'] + 'cal';

            searchResultDiv.appendChild(resultTitle);
            searchResultDiv.appendChild(resultDescription);
            searchResultDiv.appendChild(caloriesSpan);

            searchResultsDiv.appendChild(searchResultDiv);

        });
    }
});


