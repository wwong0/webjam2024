document.addEventListener('DOMContentLoaded', function () {




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
    col.classList.add('day-selected')
}

function clearColSelection(dayCols) {
    for (const key in daySelectedList) {
        daySelectedList[key] = false;
    }

    dayCols.forEach(function (col) {
        col.classList.remove('day-selected')
    })

}
