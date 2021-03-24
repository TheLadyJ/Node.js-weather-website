const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    const location = '/weather?address='+search.value

    message1.textContent='Loading...'
    message2.textContent=''

    fetch(location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }
        else{
            message1.textContent='Location: '+data.location
            message2.textContent='Forecast: '+data.forecast
        }
    })
})
}) 

