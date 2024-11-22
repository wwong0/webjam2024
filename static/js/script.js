document.addEventListener('DOMContentLoaded', function () {
    /*
    //search bar
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
                    /*let p = document.createElement('p');
                    p.textContent = match;
                    resultsDiv.appendChild(p);*/
                });
            })
    });


    const dayCols = document.querySelectorAll('.day-col');

    dayCols.forEach(function (dayCol) {
        dayCol.addEventListener('click', function () {
            clearColSelection(dayCols);
            selectCol(dayCol);
        })
    })
});

let daySelectedList = {
    'monday': false,
    'tuesday': false,
    'wednesday': false,
    'thursday': false,
    'friday': false,
    'saturday': false,
    'sunday': false,
}

function selectCol(col) {
    if (col.getAttribute('day') === 'monday') {
        daySelectedList[col.getAttribute('day')] = true;
    }
    col.classList.add('selected')
}

function clearColSelection(dayCols) {
    for (const key in daySelectedList) {
        daySelectedList[key] = false;
    }

    dayCols.forEach(function (col) {
        col.classList.remove('selected')
    })

}
