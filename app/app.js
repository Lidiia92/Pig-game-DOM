/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;


//Current dice roll number
const currentScore = document.querySelector(`#current-${activePlayer}`);
//currentScore.textContent = dice;

//Hiding dice img initialy on a page load
const diceImg = document.querySelector('.dice');
diceImg.style.display = 'none';

//Setting scores, current scores to 0 for both players
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


//Rolling the dice functionality

const rollDiceButton = document.querySelector('.btn-roll');
rollDiceButton.addEventListener('click', function() {

    //1.Random num from 1 to 6
    const dice = Math.floor(Math.random() * 6) + 1;

    //2.Display the result
    diceImg.style.display = 'block';
    diceImg.src = `dice-${dice}.png`;

    //3.Update the round score IF the rolled number was NOT a 1
});

