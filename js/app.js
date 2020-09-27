/*----- cached element references -----*/
let messageBox = document.querySelector('.message-box')
let easyButton = document.getElementById('easy')
let mediumButton = document.getElementById('medium')
let hardButton = document.getElementById('hard')
let startButton = document.getElementById('start')
let resetButton = document.getElementById('reset')
let gameBoard = document.querySelector('.game-board')
let gameScore = document.querySelector('.score')

/*----- constants -----*/
class MemoryGame {
    constructor(totalTime, difficulty) {
        this.totalTime = totalTime
        this.difficulty = difficulty
        this.cardsRendered = 0
        this.choices = []
    }
    resetGame() {
        gameBoard.innerHTML = ''
        gameScore.innerHTML = 0
    }
    cardAmount() {
        let cards = this.difficulty
        if(cards === 'easy') {
            this.cardsRendered = 8
        } else if (cards === 'medium') (
            this.cardsRendered = 16
        )
        else {
            this.cardsRendered = 24
        } 
    }
    boardRender() {
        for (let i = 0; i < this.cardsRendered; i++) {
        // TODO: have this function populate the board with the choices
        let gameGrid = document.createElement('div')
        let gamePicks = document.createElement('img')
        // gamePicks.src = '/img/IMG_6302.JPG'
        gameGrid.appendChild(gamePicks)
        gameBoard.appendChild(gameGrid)
        }
    }

}
/*----- app's state (variables) -----*/
let easyGame = new MemoryGame(30, 'easy')
let mediumGame = new MemoryGame(60, 'medium')
let hardGame = new MemoryGame(120, 'hard')

/*----- event listeners -----*/
easyButton.addEventListener('click', function() {
    
    easyGame.cardAmount()
    easyGame.boardRender()
    console.log(easyGame.cardsRendered)
})

mediumButton.addEventListener('click', function(e) {
    mediumGame.cardAmount()
    mediumGame.boardRender()
    console.log(mediumGame.cardsRendered)
})

hardButton.addEventListener('click', function(e) {
    hardGame.cardAmount()
    hardGame.boardRender()
    console.log(hardGame.cardsRendered)
})

startButton.addEventListener('click', function(e) {
    console.log('start button')
})

resetButton.addEventListener('click', resetGame)

/*----- functions -----*/
function resetGame() {
    gameBoard.innerHTML = ''
    gameScore.innerHTML = 0
}