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
        this.cardsCheck = [1]
        this.choices = ['img/html-5.png', 'img/javascript.png', 'img/python.png', 'img/css.png',
         'img/nodejs.png', 'img/github.png', 'img/visual-basic.png', 'img/react.png', 
        'img/mysql.png', 'img/ruby.png', 'img/sass.png', 'img/gnu-bash.png']
    }
    resetGame() {
        gameBoard.innerHTML = ''
        gameScore.innerHTML = 0
        messageBox.innerHTML = ''
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
    gameStart() {
        setTimeout(function() {
            messageBox.innerHTML = 'Go!'
        }, 4000)
        setTimeout(function() {
            messageBox.innerHTML = 1
        }, 3000)
        setTimeout(function() {
            messageBox.innerHTML = 2
        }, 2000)
        setTimeout(function() {
            messageBox.innerHTML = 3
        }, 1000)
    }
    revealImages() {
        let cards = document.querySelectorAll('.card')
        cards.forEach(function(card) {
            card.addEventListener('click', function(e) {
            let targetImage = e.target
            targetImage.style.opacity = '1'
            })
        })
    }
    boardRender() {
        let possibleChoices = this.choices.slice(0)
        let selected = []
        for (let i = 0; i < this.cardsRendered / 2; i++) {
            let randomInd = Math.floor(Math.random(possibleChoices.length))
            let face = possibleChoices[randomInd]
            selected.push(face)
            selected.push(face)
            possibleChoices.splice(randomInd, 1)
        }
        let counter = this.cardsRendered;
        while (counter > 0) {
            let ind = Math.floor(Math.random() * counter);
            counter--;
            // swap the last element with it
            let temp = selected[counter];
            selected[counter] = selected[ind];
            selected[ind] = temp;
        }
        for (let i = 0; i < selected.length; i++) {
            let gameGrid = $('.game-board')
            let gameCards = $(`<div class='card'><img src=${selected[i]}></img></div>`)
            gameGrid.append(gameCards)
        }
        this.revealImages()
    }
    checkMatch() {
        
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
})

mediumButton.addEventListener('click', function(e) {
    mediumGame.cardAmount()
    mediumGame.boardRender()
})

hardButton.addEventListener('click', function(e) {
    hardGame.cardAmount()
    hardGame.boardRender()
})

startButton.addEventListener('click', function(e) {
    // mediumGame.cardAmount()
    // mediumGame.boardRender()
    mediumGame.gameStart()
})

resetButton.addEventListener('click', resetGame)

/*----- functions -----*/
function resetGame() {
    gameBoard.innerHTML = ''
    gameScore.innerHTML = 0
}