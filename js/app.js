/*----- cached element references -----*/
let messageBox = document.querySelector('.message-box');
let easyButton = document.getElementById('easy');
let mediumButton = document.getElementById('medium');
let hardButton = document.getElementById('hard');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let gameBoard = document.querySelector('.game-board');
let gameScore = document.querySelector('.score');
let gameTime = document.querySelector('.timer')



/*----- constants -----*/
class MemoryGame {
    constructor(totalTime, difficulty) {
        this.totalTime = totalTime;
        this.difficulty = difficulty;
        this.cardsRendered = 0;
        this.isGameStarted = false;
        this.runTimer;
        this.choices = ['img/html-5.png', 'img/javascript.png', 'img/python.png', 'img/css.png',
         'img/nodejs.png', 'img/github.png', 'img/visual-basic.png', 'img/react.png', 
        'img/mysql.png', 'img/ruby.png', 'img/sass.png', 'img/gnu-bash.png']
    }
    resetGame() {
        gameBoard.innerHTML = '';
        gameScore.innerHTML = 0;
        messageBox.innerHTML = '';
    }
    countdownTime() {
        if(!this.isGameStarted) {
            this.isGameStarted = true;
            this.runTimer = setInterval( () => {gameTime.innerHTML = --this.totalTime}, 1000)
        }

    }
    stop(){
        if(this.isGameStarted || this.totalTime === 0){
          clearInterval(this.runTimer);
          this.isGameStarted = false
        }
      }
    checkMatch() {
        //check to see if the two cards match
        let imagesRendered = document.querySelectorAll('.picked-choice')
        let imageArr = Array.from(imagesRendered)
        let option1 = imageArr[0].getAttribute('data-info')
        let option2 = imageArr[1].getAttribute('data-info')
        if (imageArr.length === 2 && option1 === option2) {
            imagesRendered.forEach(function(image) {
                image.classList.remove('picked-choice')
                image.classList.add('winning-pick')
            })
        } else {

            imagesRendered.forEach(function(image) {
                setTimeout(function(){
                    image.style.opacity = '0'
                    image.classList.remove('picked-choice')
                }, 1000)
            })
        }
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
        messageBox.innerHTML = 'Go!'
        this.revealImages()
        this.countdownTime()
    }
    revealImages() {
        let checkFunction = this.checkMatch
        let checkWin = this.declareWin
        let cards = document.querySelectorAll('.card')
        let tries = 0
        cards.forEach(function(card) {
            card.addEventListener('click', function(e) {
            let targetImage = e.target
            tries++
            let fullTries = tries / 2
            gameScore.innerHTML = Math.round(fullTries)
            targetImage.style.opacity = '1'
            targetImage.classList.add('picked-choice')
            checkFunction()
            checkWin()
            })
        })
    }
    declareWin = () => {
        let allCards = document.querySelectorAll('.winning-pick')
        let allCardsArr = Array.from(allCards)
        let timeLeft = document.querySelector('.timer').textContent
        let scoreBoard = document.querySelector('.score').textContent
        // TODO: figure out how to use this.totalCards
        if (allCardsArr.length === this.cardsRendered) {
            messageBox.innerHTML = `You won! You did it in ${scoreBoard} turns and with ${timeLeft} seconds left!`
            this.stop()
        } else {
        }
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
            let gameCards = $(`<div class='card'><img data-info=${selected[i]} src=${selected[i]} draggable="false"></img></div>`)
            gameGrid.append(gameCards)
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
})

mediumButton.addEventListener('click', function(e) {
    gameBoard.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    mediumGame.cardAmount()
    mediumGame.boardRender()
})

hardButton.addEventListener('click', function(e) {
    gameBoard.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    hardGame.cardAmount()
    hardGame.boardRender()
})

startButton.addEventListener('click', function(e) {
   // if the cards rendered equal, 8, 16, or 24. start easy, medium or hard
   let gameboardCards = document.querySelectorAll('.card')
   let cardsArr = Array.from(gameboardCards) 
   if (cardsArr.length === 8) {
    easyGame.gameStart()
   } else if (cardsArr.length === 16) {
    mediumGame.gameStart()
   } else {
    hardGame.gameStart()
   }
    
})

resetButton.addEventListener('click', resetGame)

/*----- functions -----*/
function resetGame() {
    gameBoard.innerHTML = ''
    gameScore.innerHTML = 0
    gameBoard.style.gridTemplateColumns = '1fr 1fr 1fr 1fr'
    location.reload()
}
