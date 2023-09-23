import {addArrOfCards, addArrOfCardsHard} from "./cards.js";
import {createStartWindow} from "./start.js";
import {showCongratulations, checkReversed, showResults} from "./events.js";
import {setResult} from "./localStarage.js";

//Глобальные переменные 
const container = document.getElementById(`container`);
const cardList = document.getElementById(`card-list`); 
let counter = 0; 
const ArrOfReversedCards = [];
let cards = [];

const startGame = (event) => {
    if(event.target.hasAttribute(`id`) && event.target.tagName === "BUTTON"){
        const numberOfCards = event.target.id;
        const info = document.getElementById(`info`);
        const cardList = document.getElementById(`card-list`); 
        if(numberOfCards == 1000) {
            showResults(); 
            return;
        }
        if(numberOfCards == 8 || numberOfCards == 16){
            cardList.className = `card-list`;
        }
        if(numberOfCards == 32){
            cardList.className = `card-list-big`;
        }
        info.remove();
        if(cardList.classList.contains(`card-list-big`)){
            cards = addArrOfCardsHard();
        }
        if(cardList.classList.contains(`card-list`)){
            cards =  addArrOfCards(numberOfCards);
        }
    } else {
        return false;
    }
}
container.addEventListener(`click`, startGame);

const clickCard = (event) => {
    if(ArrOfReversedCards.includes(event.target) || event.target.dataset.bgnumber ===`0`){
        return;
    }
    if(event.target.hasAttribute("data-order")){
         if(ArrOfReversedCards.length >= 2){
             const check = checkReversed();
             check(ArrOfReversedCards);
         }
        counter++;
        let order = event.target.getAttribute(`data-order`);
        event.target.dataset.bgnumber = order;
        const twin = ArrOfReversedCards.find(i => i.dataset.order  === order);
        if(!twin){
            ArrOfReversedCards.push(event.target);
        }
        if(twin){
            event.target.dataset.bgnumber = `0`;
            twin.dataset.bgnumber = `0`;
            const index = ArrOfReversedCards.indexOf(twin);
            ArrOfReversedCards.splice(index-1,1);
            cards.splice(index-1,1);
            let index1 = cards.indexOf(event.target);
            cards.splice(index1-1,1);
        }
    }
    if(cards.length === 0){
        setResult(counter);
        const show = showCongratulations();
        show(ArrOfReversedCards, clickCard, counter);
    }
}
cardList.addEventListener(`click`, clickCard);

//Запускается, когда игрок захочет сыграть еще раз
const restart = (event) => {
    if(event.target.classList.contains(`restart`)){
        counter = 0;
        const final = document.getElementById(`final`);
        const rest = document.getElementsByClassName(`item`);
        const cardList = document.getElementById(`card-list`);
        let arr = [...rest];
        final.remove();
        arr.forEach(item => item.remove());
        cardList.addEventListener(`click`, clickCard);
        createStartWindow();
    } else {
        return false;
    }
}
container.addEventListener(`click`, restart);

//Первый запуск 
createStartWindow();