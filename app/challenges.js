/*
GAME RULES:

1. Player looses his Entire Score when he rolls two 6s in the row. After that it's the next player's turn.
2. Add the input field where players can set the winning score, so they can change the predifined score of 100. 
3. Add another dice to the game, the player looses his current score when one of the dice is 1. 

*/

let scores, roundScore, activePlayer, gamePlaying;

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    //Hiding dice img initialy on a page load
    const diceImg = document.getElementById('dice-1');
    diceImg.style.display = 'none';

    const diceImg2 = document.getElementById('dice-2');
    diceImg2.style.display = 'none';

    
    //Setting scores, current scores to 0 for both players
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(`#name-0`).textContent = 'Player 1';
    document.querySelector(`#name-1`).textContent = 'Player 1';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
}

init();

let lastDice;


function nextPlayer () {
    //next player
    document.getElementById(`current-0`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    const diceImg = document.querySelector('.dice');
    diceImg.style.display = 'none';
    const diceImg2 = document.getElementById('dice-2');
    diceImg2.style.display = 'none';
}

//Rolling the dice functionality

const rollDiceButton = document.querySelector('.btn-roll');
rollDiceButton.addEventListener('click', function() {

    if(gamePlaying){
        //1.Random num from 1 to 6
        const dice = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        //2.Display the result
        const diceImg = document.querySelector('.dice');
        diceImg.style.display = 'block';
        const diceImg2 = document.getElementById('dice-2');
        diceImg2.style.display = 'block';
        
        diceImg.src = `dice-${dice}.png`;
        diceImg2.src = `dice-${dice2}.png`;
    
        //3.Update the round score IF the rolled number was NOT a 1
        if (dice === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
            nextPlayer();
        }
        else if (dice !== 1 && dice2 !==1) {
            //Add score
            roundScore +=dice; 
            const currentScore = document.querySelector(`#current-${activePlayer}`);
            currentScore.textContent = roundScore;
        } else {
            nextPlayer();
    
        }

        lastDice = dice; 
    }

});


//Holding the score functioanlity 

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        //Add CURRENT score to global score
        scores[activePlayer] += roundScore;
    
        //Update the UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        const input = document.querySelector('.final-score').value;
        let winningScore;

        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector('.dice').style.display = "none";
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});


//New Game functionality
document.querySelector('.btn-new').addEventListener('click', init);