//Javascript code file
const stateSelect = document.querySelector('#state-slct')
document.querySelector('#search-btn').addEventListener('click', (e)=> {
    fetch(`https://api.openbrewerydb.org/breweries`)

    console.log(stateSelect.value)

});
