//Javascript code file
const stateSelect = document.querySelector('#state-slct')
const typeSelect = document.querySelector('#search-by-type')
const resultsDiv = document.querySelector(`#results-div`)

document.querySelector('#search-btn').addEventListener('click', (e)=> {
    resultsDiv.innerHTML = ""
    fetch(`http://localhost:3000/breweries`)
    .then(result => result.json())
    .then(data => {
        data.forEach(item => {
            
            if(stateSelect.value === item.state || stateSelect.value === `Select State`){
                const p = document.createElement('p')
                p.textContent = item.name
                resultsDiv.append(p)
            }
            // if(typeSelect = item.brewery_type){

            // }

        
    })
    })

});
