console.log('app.js is linked!')

/*----- constants -----*/
const easyLevel = []
const mediumLevel = []
const hardLevel = []

/*----- app's state (variables) -----*/
let userProfile = {

}
/*----- cached element references -----*/
let messageBox = document.querySelector('.message-box')
let easyButton = document.getElementById('easy')
let mediumButton = document.getElementById('medium')
let hardButton = document.getElementById('hard')
let startButton = document.getElementById('start')
let resetButton = document.getElementById('reset')

/*----- event listeners -----*/
easyButton.addEventListener('click', function(e) {
    console.log('easy button')
})

mediumButton.addEventListener('click', function(e) {
    console.log('medium button')
})

hardButton.addEventListener('click', function(e) {
    console.log('hard button')
})

startButton.addEventListener('click', function(e) {
    console.log('start button')
})

resetButton.addEventListener('click', function() {
    console.log('reset button')
})
/*----- functions -----*/