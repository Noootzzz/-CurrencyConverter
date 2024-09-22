document.addEventListener('DOMContentLoaded', function () {
    const fleche = document.getElementById('fleche');
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const fromFlag = document.getElementById('from-flag');
    const toFlag = document.getElementById('to-flag');

    function updateFlag(selectElement, flagElementId) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const flagCode = selectedOption.getAttribute('data-flag');
        const flagElement = document.getElementById(flagElementId);
        
        flagElement.className = `flag-icon flag-icon-${flagCode}`;
    }

    document.getElementById('from').addEventListener('change', function() {
        updateFlag(this, 'from-flag');
    });

    document.getElementById('to').addEventListener('change', function() {
        updateFlag(this, 'to-flag');
    });

    window.onload = function() {
        updateFlag(document.getElementById('from'), 'from-flag');
        updateFlag(document.getElementById('to'), 'to-flag');
    };

    fleche.addEventListener('click', function () {
        const fromValue = fromSelect.value;
        const toValue = toSelect.value;

        fromSelect.value = toValue;
        toSelect.value = fromValue;

        updateFlag(fromSelect, 'from-flag');
        updateFlag(toSelect, 'to-flag');
    });


    function updateDate() {
        const now = new Date();
        const dateString = now.toLocaleDateString();
        document.getElementById('current-date').textContent = `Date : ${dateString}`;
    }

    window.onload = updateDate;

});