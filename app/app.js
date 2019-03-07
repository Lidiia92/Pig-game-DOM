/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//Random number from 1 to 6
dice = Math.floor(Math.random() * 6) + 1;

//Current dice roll number
const currentScore = document.querySelector(`#current-${activePlayer}`);
currentScore.textContent = dice;

//Hiding dice img initialy on a page load
const diceImg = document.querySelector('.dice');
diceImg.style.display = 'none';

