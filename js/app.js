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
        this.gameScore = 0
        this.choices = ['img/html-5.png', 'img/javascript.png', 'img/python.png', 'img/css.png',
         'img/nodejs.png', 'img/github.png', 'img/visual-basic.png', 'img/react.png', 
        'img/mysql.png', 'img/ruby.png', 'img/sass.png', 'img/gnu-bash.png']
    }
    countdownTime = () => {
        if(!this.isGameStarted) {
            this.isGameStarted = true;
            this.runTimer = setInterval( () => {gameTime.innerHTML = --this.totalTime}, 1000)
        }

    }
    stop = () => {
        if(this.isGameStarted){
          clearInterval(this.runTimer);
          this.isGameStarted = false
        }
      }
    checkMatch = () => {
        //check to see if the two cards match
        let imagesRendered = document.querySelectorAll('.picked-choice')
        let imageArr = Array.from(imagesRendered)
        let option1 = imageArr[0].getAttribute('data-info')
        let option2 = imageArr[1].getAttribute('data-info')
        if (imageArr.length === 2 && option1 === option2) {
            imagesRendered.forEach((image) => {
                image.classList.remove('picked-choice')
                image.classList.add('winning-pick')
                image.style.borderStyle = 'solid'
                image.style.borderColor = 'yellow'
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
    cardAmount = () => {
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
    gameStart = () => {
        messageBox.style.fontSize = '20px'
        messageBox.innerHTML = 'Go!'
        this.revealImages()
        this.countdownTime()
    }
    imageClick = (e) => {
        let targetImage = e.target
        this.gameScore++
        let fullTries = this.gameScore / 2
        gameScore.innerHTML = Math.round(fullTries)
        targetImage.style.opacity = '1'
        targetImage.classList.add('picked-choice')
        this.checkMatch()
        this.declareWin()
    }
    removeCLick = () => {
        let cards = document.querySelectorAll('.card')
        cards.forEach((card) => {
            card.removeEventListener('click', this.imageClick)
        })
    }
    revealImages = () => {
        let cards = document.querySelectorAll('.card')
        cards.forEach((card) => {
            card.addEventListener('click', this.imageClick)
        })
    }
    declareWin = () => {
        let allCards = document.querySelectorAll('.winning-pick')
        let allCardsArr = Array.from(allCards)
        let timeLeft = document.querySelector('.timer').textContent
        let scoreBoard = document.querySelector('.score').textContent
        if (allCardsArr.length === this.cardsRendered) {
            messageBox.innerHTML = `You won! You did it in ${scoreBoard} turns and with ${timeLeft} seconds left!`
            this.stop()
            this.removeCLick()
        } else {
        }
    }
    boardRender = () => {
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
let gameLostMessage = 'Sorry! You Ran out of time! Try Again?'

/*----- functions -----*/
let resetGame = () => {
    location.reload()
}

/*----- event listeners -----*/
easyButton.addEventListener('click', () => {
    easyGame.cardAmount()
    easyGame.boardRender()
    mediumButton.disabled = true
    hardButton.disabled = true
}, {once: true})

mediumButton.addEventListener('click', (e) => {
    gameBoard.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    mediumGame.cardAmount()
    mediumGame.boardRender()
    easyButton.disabled = true
    hardButton.disabled = true
}, {once: true})

hardButton.addEventListener('click', (e) => {
    gameBoard.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    hardGame.cardAmount()
    hardGame.boardRender()
    easyButton.disabled = true
    mediumButton.disabled = true
}, {once: true})

startButton.addEventListener('click', (e) => {
   // if the cards rendered equal, 8, 16, or 24. start easy, medium or hard
   let gameboardCards = document.querySelectorAll('.card')
   let cardsArr = Array.from(gameboardCards) 
   if (cardsArr.length === 8) {
    easyGame.gameStart()
    setTimeout(() => {
        if(easyGame.isGameStarted) {
            messageBox.innerHTML = gameLostMessage
        }
        easyGame.stop()
        //todo: add remove listeners on cards       
    }, 30500);
   } else if (cardsArr.length === 16) {
    mediumGame.gameStart()
    setTimeout(() => {
        if(mediumGame.isGameStarted) {
            messageBox.innerHTML = gameLostMessage
        }
        mediumGame.stop()
        //todo: add remove listeners on cards
    }, 61000);
   } else {
    hardGame.gameStart()
    setTimeout(() => {
        if(mediumGame.isGameStarted) {
            messageBox.innerHTML = gameLostMessage
        }
        hardGame.stop()
        //todo: add remove listeners on cards
    }, 121000);
   }
}, {once: true})

resetButton.addEventListener('click', resetGame)


