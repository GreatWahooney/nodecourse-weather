console.log('Client side javascript file is loaded.')
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const statusSlot = document.querySelector('#status')
const resultSlot = document.querySelector('#weather')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    statusSlot.textContent = 'Loading...'
    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                statusSlot.textContent = 'Is that a real place? I couldn\'t find it.'
            }
            statusSlot.textContent = 'Got it! Here you go:'
            resultSlot.textContent = 'In ' + data.location.name + ', ' + data.location.country + ' it is currently ' + data.current.temperature + ' degrees Celcius, but feels like ' + data.current.feelslike
            console.log(data)
        })
    })
})