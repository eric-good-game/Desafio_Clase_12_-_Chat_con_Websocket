// Form Add Products
const formProducts = document.getElementById('addProduct')

// Chat
const formMessage = document.getElementById('addMessage')
const formEmail = document.getElementById('addEmail')
const inputMessage = document.getElementById('message')
const inputSend = document.getElementById('send')
let email = null

// List Products
let listProducts;
// Socket.IO
const socket = io();

// script for formProducts 
const initialStates = {
  formData:{
    name:'',
    price:'',
    thumbnail:'',
  }
}

let formData = {
  name:'',
  price:'',
  thumbnail:'',
};
const handleFocus = e => {
  e.target.parentNode.classList.toggle('focus')
}
const handleChange = e => {
  formData[e.target.id]=e.target.value
}

formProducts.querySelectorAll('input').forEach(input=>{
  input.onfocus = handleFocus
  input.onblur = handleFocus
  input.oninput = handleChange
})

formProducts.onsubmit = async(e) => {
  e.preventDefault()

  socket.emit('product:new',formData)
  formProducts.reset()
  formData = initialStates.formData
}
// END

// Chat 

formMessage.onsubmit = e => {
  e.preventDefault();
  const content = inputMessage.value;

  socket.emit('message:new',{email,content})
  
  inputSend.className = 'send'
  formMessage.reset()
}
formEmail.onsubmit = e => {
  e.preventDefault()
  email = formEmail.querySelector('input').value

  if(email){
    document.getElementById('login').classList.add('hidden')
    socket.emit('message:load',{email});
  }
}
inputMessage.oninput = e => {
  const length = e.target.value.length

  if(length){
    if(!inputSend.classList.contains('sliderUp')) inputSend.className = 'sliderUp'
  }else{
    inputSend.classList.replace('sliderUp','sliderDown')
  }
}
inputMessage.onfocus = handleFocus
inputMessage.onblur = handleFocus
inputMessage.onclick = e =>{
  e.stopPropagation()
}
inputSend.onclick = e =>{
  e.stopPropagation()
}
formMessage.onclick = e => {
  inputMessage.focus()
}

socket.on('message:new', data => {
  const options = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
  data.date = `[${ new Date(data.date).toLocaleDateString('Es-mx', options)}]`
  
  const div = document.createElement('div');
  console.log(data);
  Object.keys(data).forEach(key=>{
    if(key=='id'){
      return
    }
    div.innerHTML+=`<p class=${key}>${data[key]}</p>`
  })

  document.getElementById('messages').append(div)
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight
})
socket.on('product:new', data => {

  const tr = document.createElement('tr');
  tr.classList.add('item')
  const keys = ['thumbnail','name','price'];

  keys.forEach(key=>{
    let html = '';
    switch (key) {
      case 'thumbnail':
        html = `<td class=${key}><img src="${data[key]}"/></td>`
        break;
      case 'name':
            
        html = `<td class=${key}><p>${data[key]}</p></td>`
        break;
      case 'price':
              
        html = `<td class=${key}><div><p>$</p><p>${data[key].toFixed(2)}</p></div></td>`
        break;
    
      default:
        break;
    }
    tr.innerHTML += html;
  })
  listProducts.querySelector('#empty').style.display = 'none';
  listProducts.querySelector('tbody').prepend(tr)
  document.querySelector('.scrollTable').scrollTop = 0;
})
socket.on('message:load', data => {
  console.log('message:load');

  console.log('data',data);
  data.forEach(message=>{
    const options = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    message.date = `[${ new Date(message.date).toLocaleDateString('Es-mx', options)}]`
    
    const div = document.createElement('div');
  
    Object.keys(message).forEach(key=>{
      if(key == 'id') return
      div.innerHTML+=`<p class=${key}>${message[key]}</p>`
    })
  
    document.getElementById('messages').append(div)
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight

  })
})
// List Products
const getTemplate = async ()=>{
  try {
    const response = await fetch('http://localhost:8080/partials/productList', {
    // const response = await fetch('http://192.168.1.71:8080/partials/productList', {
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const {template,data} = await response.json();
    const myTemplate = Handlebars.compile(template);
    const html = myTemplate(data);

    document.getElementsByClassName('section-full')[0].innerHTML = html;
  
    listProducts = document.getElementById('listProducts');

  } catch (error) {
    console.log(error);
  }
  
}

getTemplate();