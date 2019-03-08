/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    //Hiding dice img initialy on a page load
    const diceImg = document.querySelector('.dice');
    diceImg.style.display = 'none';
    
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
}

//Rolling the dice functionality

const rollDiceButton = document.querySelector('.btn-roll');
rollDiceButton.addEventListener('click', function() {

    if(gamePlaying){
        //1.Random num from 1 to 6
        const dice = Math.floor(Math.random() * 6) + 1;
    
        //2.Display the result
        const diceImg = document.querySelector('.dice');
        diceImg.style.display = 'block';
        diceImg.src = `dice-${dice}.png`;
    
        //3.Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore +=dice; 
            const currentScore = document.querySelector(`#current-${activePlayer}`);
            currentScore.textContent = roundScore;
        } else {
            nextPlayer();
    
        }
    }

});


//Holding the score functioanlity 

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        //Add CURRENT score to global score
        scores[activePlayer] += roundScore;
    
        //Update the UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
        
        //Check if player won the game
        if (scores[activePlayer] >= 20) {
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



