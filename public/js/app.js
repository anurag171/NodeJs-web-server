console.log('Client side javascript file is loaded')
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#messageOne')
const messageTwo =document.querySelector('#messageTwo')






weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading ...'
    messageTwo.textContent=''
    console.log("Location =" + location)
    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{
      response.json().then((data)=>{
        if(data.error){
          console.log("Error" + data.error)
          messageOne.textContent=data.error
      }else{
        console.log('URL '+url)
        console.log('Data '+data)
        messageOne.textContent='It feels like ' + data.description
        messageTwo.textContent='Observation Time ' + data.time
      }

      }) 
  
})
})