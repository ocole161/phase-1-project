//Javascript code file
const stateSelect = document.querySelector('#state-slct')
const typeSelect = document.querySelector('#search-by-type')
const nameSearch = document.querySelector(`#search-bar`)
const resultsDiv = document.querySelector(`#results-div`)
const randomDiv = document.querySelector(`#random-div`)




const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

document.querySelector('#search-btn').addEventListener('click', (e)=> {
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
    webLink.textContent = `Website`
    
    if(item.website_url !== ``){
    h5.append(webLink)
    }

        h5.className = `hidden`
        p.append(h5)
                
        p.addEventListener('mouseover', () =>{
        h5.className = ``})
        p.addEventListener('mouseout', () =>{
        h5.className = `hidden`
        })


        resultsDiv.append(p)
        }
    })
    })

});


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
