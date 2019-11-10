const menuButton = document.querySelector('#menu-button')
const menu = document.querySelector('#menu')

menuButton.addEventListener('click', function(){
menu.className = 'menu-open'
})

const closeButton = document.querySelector('#close')
closeButton.addEventListener('click', function(){
  menu.className = 'menu-close'
})