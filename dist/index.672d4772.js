"use strict";
// set up query selector for all elements in app
// dealer section
const dealerSection = document.querySelector(".dealer");
const dealerScore = document.querySelector(".dealer-total");
const dealerCards = document.querySelectorAll(".dealer--card");
let dealerCard1 = document.querySelector(".dealer-card-1");
let dealerCard2 = document.querySelector(".dealer-card-2");
let dealerCardsArray = Array.from(dealerCards);
const dealerCardDiv = document.querySelector(".dealer-cards");
const originalDealerCardsArray = dealerCardsArray;
// player01 section
const player01Section = document.querySelector(".player--01");
const player01Total = document.querySelector(".player1-total-score");
const player01Current = document.querySelector(".player01-current-score");
let player01Card1 = document.querySelector(".player01-card-1");
let player01Card2 = document.querySelector(".player01-card-2");
const player01Cards = document.querySelectorAll(".player01-card");
let player01CardsArray = Array.from(player01Cards);
const player01cardDiv = document.querySelector(".player01--cards");
const originalCardsArray = player01CardsArray;
// player02 section
const player02Section = document.querySelector(".player--02");
const player02Total = document.querySelector(".player2-total-score");
const player02current = document.querySelector(".player02-current-score");
let player02Card1 = document.querySelector(".player02-card-1");
let player02Card2 = document.querySelector(".player02-card-2");
const player02Cards = document.querySelectorAll(".player02-card");
let player02CardsArray = Array.from(player02Cards);
const player02cardDiv = document.querySelector(".player02--cards");
const originalPlayer02CardsArray = player02CardsArray;
// buttons section
const hitBtn = document.querySelector(".btn--hit");
const stickBtn = document.querySelector(".btn--stick");
const newGameBtn = document.querySelector(".btn--new");
const onePlayer = document.getElementById("onePlayer");
const twoPlayer = document.getElementById("twoPlayers");
const winnerMessage = document.querySelector(".winner-message");
// card selector
// set up global variables
let activePlayer = 1;
let player01CurrentScore = 0;
let player02CurrentScore = 0;
let player01TotalScore = 0;
let player02TotalScore = 0;
let dealerCurrentScore;
let noOfPlayers = 1;
// game start up initialisation
function init() {
    player01Total.textContent = player01TotalScore;
    player02Total.textContent = player02TotalScore;
    newGame();
}
// new game function
function newGame() {
    activePlayer = 1;
    player01Section.classList.add("player--active");
    player02Section.classList.remove("player--active");
    dealerSection.classList.remove("player--active");
    player01Current.textContent = 0;
    player02current.textContent = 0;
    player02CurrentScore = 0;
    player01CurrentScore = 0;
    winnerMessage.classList.add("hidden");
    dealerCard1.src = randomCard();
    dealerCardsArray = originalDealerCardsArray;
    player01CardsArray = originalCardsArray;
    player01cardDiv.innerHTML = `<img
  src="http://127.0.0.1:5500/cards/0_1.png"
  alt="card"
  class="card player--card player01-card-1 player01-card card-back"
/>
<img
  src="http://127.0.0.1:5500/cards/0_1.png"
  alt="card"
  class="card player--card player01-card-2 player01-card card-back"
/>`;
    dealerCardDiv.innerHTML = `<img 
  src="${dealerCard1.src}" 
  alt="card" 
  class="card dealer--card dealer-card-1" 
  />
<img
 src="http://127.0.0.1:5500/cards/0_1.png" 
 alt="card" 
 class="card dealer--card dealer-card-2 card-back"
  />`;
    player02cardDiv.innerHTML = `<img
  src="http://127.0.0.1:5500/cards/0_1.png"
  alt="card"
  class="card player--card player02-card-1 player02-card card-back"
/>
<img
  src="http://127.0.0.1:5500/cards/0_1.png"
  alt="card"
  class="card player--card player02-card-2 player02-card card-back"
/>`;
    dealerCardsArray[0].src = dealerCard1.src;
    dealerCardsArray[1].src = "http://127.0.0.1:5500/cards/0_1.png";
    player01CardsArray[0].src = "http://127.0.0.1:5500/cards/0_1.png";
    player01CardsArray[1].src = "http://127.0.0.1:5500/cards/0_1.png";
    player02CardsArray[0].src = "http://127.0.0.1:5500/cards/0_1.png";
    player02CardsArray[1].src = "http://127.0.0.1:5500/cards/0_1.png";
    player01Card1 = document.querySelector(".player01-card-1");
    player01Card2 = document.querySelector(".player01-card-2");
    player01CardsArray = Array.from(player01Cards);
    player02Card1 = document.querySelector(".player02-card-1");
    player02Card2 = document.querySelector(".player02-card-2");
    player02CardsArray = Array.from(player02Cards);
    dealerCard1 = document.querySelector(".dealer-card-1");
    dealerCard2 = document.querySelector(".dealer-card-2");
    dealerCardsArray = Array.from(dealerCards);
    dealerScore.textContent = calcScore(dealerCardsArray);
    dealerCurrentScore = dealerScore.textContent;
}
// player one wins
function player01Wins() {
    dealerSection.classList.remove("player--active");
    player02Section.classList.remove("player--active");
    player01Section.classList.add("player--active");
    player01Total.textContent = player01TotalScore += 1;
    winnerMessage.textContent = "Player 1 wins!";
    winnerMessage.classList.add("win");
    winnerMessage.classList.remove("lose");
    winnerMessage.classList.remove("hidden");
}
// player two wins
function player02Wins() {
    dealerSection.classList.remove("player--active");
    player01Section.classList.remove("player--active");
    player02Section.classList.add("player--active");
    player02Total.textContent = player02TotalScore += 1;
    winnerMessage.textContent = "Player 2 wins!";
    winnerMessage.classList.add("win");
    winnerMessage.classList.remove("lose");
    winnerMessage.classList.remove("hidden");
}
// dealer wins
function dealerWins() {
    dealerSection.classList.add("player--active");
    player01Section.classList.remove("player--active");
    player02Section.classList.remove("player--active");
    winnerMessage.textContent = "Dealer wins!";
    winnerMessage.classList.add("lose");
    winnerMessage.classList.remove("win");
    winnerMessage.classList.remove("hidden");
}
// player one and two wins
function player01And02Wins() {
    player02Section.classList.add("player--active");
    player01Section.classList.add("player--active");
    dealerSection.classList.remove("player--active");
    player01Total.textContent = player01TotalScore += 1;
    player02Total.textContent = player02TotalScore += 1;
    winnerMessage.textContent = "Player 1 and Player 2 wins!";
    winnerMessage.classList.add("win");
    winnerMessage.classList.remove("lose");
    winnerMessage.classList.remove("hidden");
}
// draw
function player01Draw() {
    dealerSection.classList.remove("player--active");
    player01Section.classList.remove("player--active");
    player02Section.classList.remove("player--active");
    winnerMessage.textContent = "Player 1 Draw!";
    winnerMessage.classList.add("win");
    winnerMessage.classList.remove("lose");
    winnerMessage.classList.remove("hidden");
}
function player02Draw() {
    dealerSection.classList.remove("player--active");
    player01Section.classList.remove("player--active");
    player02Section.classList.remove("player--active");
    winnerMessage.textContent = "Player 2 Draw!";
    winnerMessage.classList.add("win");
    winnerMessage.classList.remove("lose");
    winnerMessage.classList.remove("hidden");
}
function player01And02Draw() {
    dealerSection.classList.remove("player--active");
    player01Section.classList.remove("player--active");
    player02Section.classList.remove("player--active");
    winnerMessage.textContent = "Player 1 and 2 Draw!";
    winnerMessage.classList.add("win");
    winnerMessage.classList.remove("lose");
    winnerMessage.classList.remove("hidden");
}
// random card function
function randomCard() {
    function firstNum() {
        let randomCard = Math.floor(Math.random() * 13) + 1;
        return randomCard;
    }
    function secondNum() {
        let randomCard = Math.floor(Math.random() * 4) + 1;
        return randomCard;
    }
    return `http://127.0.0.1:5500/cards/${firstNum()}_${secondNum()}.png`;
}
function calcScore(cardsArray) {
    let score = 0;
    for(let i = 0; i < cardsArray.length; i++){
        let card = cardsArray[i].src;
        let cardValueNum = parseInt(card.slice(28).split("_")[0]);
        if (cardValueNum > 10) cardValueNum = 10;
        score += cardValueNum;
    }
    return score;
}
function addCard(cardsArray, currentDOM, currDiv) {
    let newCard = document.createElement("img");
    newCard.classList.add(`${activePlayer === 0 ? "dealer--card" : activePlayer === 1 ? "player01-card" : "player02-card"}`, "card", `${activePlayer === 0 ? "dealer-card-1" : "player--card"}`, `${activePlayer === 0 ? "dealer-card-1" : activePlayer === 1 ? "player01-card-1" : "player02-card-1"}`);
    newCard.src = randomCard();
    cardsArray.push(newCard);
    currentDOM.textContent = calcScore(cardsArray);
    currDiv.appendChild(newCard);
}
// hit function
function hit(currentScore, cardsArray, card1, card2, currentDOM, currDiv) {
    if (currentScore < 21) {
        const emptyCardIndex = cardsArray.findIndex((card)=>card.src.slice(28).split("_")[0] === "0");
        if (emptyCardIndex !== -1) {
            if (emptyCardIndex === 0) {
                card1.src = randomCard();
                card1.classList.remove("card-back");
            } else {
                card2.src = randomCard();
                card2.classList.remove("card-back");
            }
            emptyCardIndex === 0 ? cardsArray[emptyCardIndex].src = card1.src : cardsArray[emptyCardIndex].src = card2.src;
            currentDOM.textContent = calcScore(cardsArray);
        } else addCard(cardsArray, currentDOM, currDiv);
    }
}
// stick function
async function stick() {
    // 1 PLAYER GAME
    if (noOfPlayers === 1 && player01CurrentScore < 21) dealersTurn();
    // 2 PLAYER GAME
    if (noOfPlayers === 2 && activePlayer === 1) {
        activePlayer = 2;
        player01Section.classList.remove("player--active");
        player02Section.classList.add("player--active");
    } else if (noOfPlayers === 2 && activePlayer === 2) dealersTurn();
}
// dealers turn function
async function dealersTurn() {
    activePlayer = 0;
    player01Section.classList.remove("player--active");
    player02Section.classList.remove("player--active");
    dealerSection.classList.add("player--active");
    let highestScore = 0;
    if (player01CurrentScore <= 21 && player02CurrentScore <= 21) highestScore = Math.max(player01CurrentScore, player02CurrentScore);
    else if (player01CurrentScore <= 21 && player02CurrentScore > 21) highestScore = +player01CurrentScore;
    else if (player01CurrentScore > 21 && player02CurrentScore <= 21) highestScore = +player02CurrentScore;
    while(+dealerCurrentScore <= +highestScore){
        await new Promise((resolve)=>setTimeout(resolve, 700));
        hit(dealerCurrentScore, dealerCardsArray, dealerCard1, dealerCard2, dealerScore, dealerCardDiv);
        dealerCurrentScore = dealerScore.textContent;
        // 1 player game
        if (noOfPlayers === 1) {
            if (+dealerCurrentScore > 21) player01Wins();
            else if (+dealerCurrentScore === 21 && +player01CurrentScore === 21) player01Draw();
            else if (+dealerCurrentScore > +player01CurrentScore) dealerWins();
        // 2 player game
        } else if (noOfPlayers === 2) {
            if (+dealerCurrentScore > 21) {
                if (player01CurrentScore <= 21 && player02CurrentScore <= 21) player01And02Wins();
                else if (player01CurrentScore <= 21) player01Wins();
                else if (player02CurrentScore <= 21) player02Wins();
            } else if (+dealerCurrentScore === 21) {
                if (+player01CurrentScore === 21 && +player02CurrentScore === 21) player01And02Draw();
                else if (+player01CurrentScore === 21) player01Draw();
                else if (+player02CurrentScore === 21) player02Draw();
            } else if (+dealerCurrentScore > highestScore) dealerWins();
        }
    }
}
// start up game
init();
// set up event listener for all elements in app
hitBtn.addEventListener("click", async function() {
    // 1 PLAYER GAME
    if (noOfPlayers === 1 && activePlayer === 1) {
        hit(player01CurrentScore, player01CardsArray, player01Card1, player01Card2, player01Current, player01cardDiv);
        player01CurrentScore = player01Current.textContent;
        // PLAYER 01 BUST AND DEALER WINS
        if (+player01CurrentScore > 21) dealerWins();
        else if (+player01CurrentScore === 21) dealersTurn(player01Section, player01CurrentScore);
    } else if (noOfPlayers === 2) {
        // PLAYER 01 TURN
        if (activePlayer === 1) {
            hit(player01CurrentScore, player01CardsArray, player01Card1, player01Card2, player01Current, player01cardDiv);
            player01CurrentScore = player01Current.textContent;
            // PLAYER 01 BUST PLAYER 02 TURN
            if (+player01CurrentScore >= 21) {
                activePlayer = 2;
                player01Section.classList.remove("player--active");
                player02Section.classList.add("player--active");
            }
        } else if (activePlayer === 2) {
            hit(player02CurrentScore, player02CardsArray, player02Card1, player02Card2, player02current, player02cardDiv);
            player02CurrentScore = player02current.textContent;
            // IF BOTH PLAYERS BUST DEALER WINS
            if (+player02CurrentScore > 21 && +player01CurrentScore > 21) dealerWins();
            else if (+player02CurrentScore > 21 && +player01CurrentScore <= 21) dealersTurn(player01Section, player01CurrentScore);
            else if (+player02CurrentScore === 21) dealersTurn(player02Section, player02CurrentScore);
        }
    }
});
newGameBtn.addEventListener("click", newGame);
stickBtn.addEventListener("click", stick);
onePlayer.addEventListener("click", function() {
    noOfPlayers = 1;
});
twoPlayer.addEventListener("click", function() {
    noOfPlayers = 2;
}); // winnerMessage.classList.remove('hidden');
 // winnerMessage.textContent = 'Player 5 wins!';
 //   hit()
 // dealerCard1.src = 'cards/10_4.png';
 // player01Total.textContent = 10
 // console.log(dealerCardsArray);
 // console.log(dealerCards[0].src);
 // REF
 // function hit(currentScore, cardsArray, card1, card2, currentDOM) {
 //   if (player01CurrentScore < 21 && activePlayer === 1) {
 //     if (player01CardsArray[0].src.slice(28).split('_')[0] === '0') {
 //       player01Card1.src = randomCard();
 //       player01CardsArray[0].src = player01Card1.src;
 //       player01Current.textContent = player01CurrentScore =
 //         calcScore(player01CardsArray);
 //     } else if (player01CardsArray[1].src.slice(28).split('_')[0] === '0') {
 //       player01Card2.src = randomCard();
 //       player01CardsArray[1].src = player01Card2.src;
 //       player01Current.textContent = player01CurrentScore =
 //         calcScore(player01CardsArray);
 //     } else {
 //       addCard();
 //     }
 //   }
 // }
 // HIT FUNCTION
 // PLAYER 01 TO HIT UNTIL BUST, STICK OR 21
 // /// IF BUST SWITCH PLAYER
 // /// IF STICK SWITCH PLAYER
 // /// IF 21 SWITCH PLAYER
 // PLAYER 02 TO HIT UNTIL BUST, STICK OR 21
 // /// IF PLAYER 02 BUST AND PLAYER 01 BUST DEALER WINS
 // /// IF PLAYER 02 BUST AND PLAYER 01 CURRENT SCORE < 21 DEALERS TURN
 // /// IF PLAYER 02 CURRENT SCORE === 21 DEALERS TURN

//# sourceMappingURL=index.672d4772.js.map
