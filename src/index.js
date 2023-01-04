//Javascript code file
// Owen's branch
const stateSelect = document.querySelector('#state-slct')
const typeSelect = document.querySelector('#search-by-type')
const nameSearch = document.querySelector(`#search-bar`)
const resultsDiv = document.querySelector(`#results-div`)
const randomDiv = document.querySelector(`#random-div`)


// Build list of results
function renderResults(){
    resultsDiv.innerHTML = ""
    fetch(`http://localhost:3000/breweries`)
    .then(result => result.json())
    .then(data => {
        data.forEach(item => {
            const addressCheck = (item.street !== ``) ? `Address: ${item.street} ${item.address_2} ${item.address_3}` : `Address Unknown`
            if((stateSelect.value === item.state || stateSelect.value === `Select State`) && (typeSelect.value.toLowerCase() === item.brewery_type || typeSelect.value === `Select Type`) && (item.name.toLowerCase().includes(nameSearch.value.toLowerCase()) || nameSearch.value === ``)){
                const p = document.createElement('p')
                p.textContent = item.name
                const h5 = document.createElement('h5')
                h5.textContent = 
`    Location: ${item.city}, ${item.state}
    Brewery Type: ${item.brewery_type.charAt(0).toUpperCase() + item.brewery_type.slice(1)}
    ${addressCheck}
    `
                const webLink = document.createElement('a')
                webLink.href = `${item.website_url}`
                webLink.target = '_blank'
                webLink.textContent = `Website\n`
                
                // Add edit button
                const editBtn = document.createElement('button')
                editBtn.textContent = 'Edit'
                
                // Only add link if website exists
                if(item.website_url !== ``){
                    h5.append(webLink)
                    editBtn.className = 'editBtn'
                }

                h5.append(editBtn)

                // Create edit form
                function renderForm () {
                    var br = document.createElement("br")
                    h5.innerHTML = ''
                    h5.className = ``
                    h5.style.paddingBottom = "2000px"
                    const nameEdit = document.createElement('input')
                    const cityEdit = document.createElement('input')
                    const stateEdit = document.createElement('input')
                    const typeEdit = document.createElement('input')
                    const streetEdit = document.createElement('input')
                    const ad2Edit = document.createElement('input')
                    const ad3Edit = document.createElement('input')
                    const urlEdit = document.createElement('input')
                    const submitEdit = document.createElement('button')
                    const deleteBtn = document.createElement('button')
                    nameEdit.value = item.name
                    cityEdit.value = item.city
                    typeEdit.value = item.brewery_type
                    stateEdit.value = item.state
                    streetEdit.value = item.street
                    ad2Edit.value = item.address_2
                    ad3Edit.value = item.address_3
                    urlEdit.value = item.website_url
                    submitEdit.textContent = 'Submit'
                    deleteBtn.textContent = 'Delete'
                    h5.append("Name: ")
                    h5.append(nameEdit)
                    h5.appendChild(br.cloneNode())
                    h5.append("City: ")
                    h5.append(cityEdit)
                    h5.appendChild(br.cloneNode())
                    h5.append("State: ")
                    h5.append(stateEdit) 
                    h5.appendChild(br.cloneNode())
                    h5.append("Type: ")
                    h5.append(typeEdit)
                    h5.appendChild(br.cloneNode())
                    h5.append("Address: ")
                    h5.append(streetEdit)
                    h5.append(ad2Edit)
                    h5.append(ad3Edit)
                    h5.appendChild(br.cloneNode())
                    h5.append("Website: ")
                    h5.append(urlEdit)
                    h5.appendChild(br.cloneNode())
                    h5.append(submitEdit)
                    h5.append(deleteBtn)
                    submitEdit.addEventListener('click', (e) =>
                        fetch(`http://localhost:3000/breweries/${item.id}`, {
                            method: 'PATCH',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: nameEdit.value,
                                city: cityEdit.value,
                                type: typeEdit.value,
                                state: stateEdit.value,
                                street: streetEdit.value,
                                address_2: ad2Edit.value,
                                address_3: ad3Edit.value,
                                website_url: urlEdit.value,
                            })
                        })
                        .then(p.textContent = nameEdit.value)
                        
                    )

                    deleteBtn.addEventListener('click', () =>
                        fetch(`http://localhost:3000/breweries/${item.id}`, {
                            method: 'DELETE'
                        })
                        .then(p.remove())
                    )
                }

                editBtn.addEventListener('click', renderForm)

                h5.className = `hidden`
                p.append(h5)       
                p.addEventListener('mouseover', () =>{
                h5.className = ``
                })
                p.addEventListener('mouseout', () =>{
                h5.className = `hidden`
                })
                resultsDiv.append(p)
            }
        })
    })
}

// Initiate search when search button is clicked
document.querySelector('#search-btn').addEventListener('click', renderResults);

// Initiate search when Enter key is pressed
document.addEventListener('keydown', (e)=>{
if(e.key === 'Enter'){
renderResults()
}
});

// Display random brewery
const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

document.addEventListener(`DOMContentLoaded`, (e)=>{
    randomDiv.innerHTML =``
    fetch(`http://localhost:3000/breweries`)
    .then(result => result.json())
    .then(data => {
        const randomItem = getRandom(data)
        const h3 = document.createElement('h3')
        h3.textContent = randomItem.name
        const p1 = document.createElement('p')

        p1.textContent = `    Location: ${randomItem.city}, ${randomItem.state}
    Brewery Type: ${randomItem.brewery_type.charAt(0).toUpperCase() + randomItem.brewery_type.slice(1)} 
    Address: ${randomItem.street} ${randomItem.address_2} ${randomItem.address_3}
    `
    const webLink = document.createElement('a')
    webLink.href = `${randomItem.website_url}`
    webLink.target = '_blank'
    webLink.textContent = `Website`
        p1.append(webLink)
        h3.appendChild(p1)
        randomDiv.append(h3)
    })
})

