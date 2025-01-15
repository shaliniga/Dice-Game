'use strict';

//selecting elements
const Score0 = document.querySelector('#score--0');
const Score1 = document.getElementById('score--1');
const diceHidden = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Score = document.getElementById('current--0');
const current1Score = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;


const init = function(){

    currentScore = 0;
    activePlayer = 0;
    scores=[0,0];
    playing=true;

    diceHidden.classList.add('hidden');
    current0Score.textContent=0;
    current1Score.textContent=0;
    Score0.textContent=0;
    Score1.textContent=0;
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
}
init();

const switchPlayer = function(){
    currentScore =0;
    document.getElementById(`current--${activePlayer}`).textContent=currentScore;  
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

//Roll dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){
    //generating random dice roll
    const dice = Math.floor(Math.random() * 6)+1;

    diceHidden.classList.remove('hidden');
    diceHidden.src=`dice-${dice}.png`;

    if(dice!==1){
        //add dice to current score
        currentScore +=dice;
        //current0Score.textContent=currentScore;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }
    else{
        //switch player
        switchPlayer();
    }
    }
})

//score hold functionality
btnHold.addEventListener('click',function(){
    if(playing){
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >=100){
        playing=false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceHidden.classList.add('hidden');
    }
    else{
        switchPlayer();
    }
    }
})

//new game functionality
btnNew.addEventListener('click',init);