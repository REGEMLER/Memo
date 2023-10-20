import {addArrOfCards, addArrOfCardsHard} from "./cards.js";
import {createStartWindow} from "./start.js";
import {showCongratulations, checkReversed, showResults} from "./events.js";
import {setResult} from "./localStorage.js";

//Глобальные переменные 
const container = document.getElementById(`container`);
const cardList = document.getElementById(`card-list`); 
let counter = 0; 
let ArrOfReversedCards = [];
let cards = [];

const startGame = (event) => {
    if(event.target.hasAttribute(`id`) && event.target.tagName === "BUTTON"){
        const numberOfCards = event.target.id;
        const info = document.getElementById(`info`);
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
        counter++;
        let order = event.target.getAttribute(`data-order`);
        event.target.dataset.bgnumber = order;
        const twin = ArrOfReversedCards.find(i => i.dataset.order  === order);
        ArrOfReversedCards.push(event.target);
        const audio2 = document.getElementById("audio2");
        audio2.play();
        if(twin){
            setTimeout(() => {
                event.target.dataset.bgnumber = `0`;
            }, 500);
            twin.dataset.bgnumber = `0`;
            ArrOfReversedCards = [...ArrOfReversedCards.filter( item => item.dataset.order !== twin.dataset.order)];
            cards = [...cards.filter( item => item.dataset.order !== twin.dataset.order)];
            const audio1 = document.getElementById("audio1");
            audio1.play();
        }
        if(ArrOfReversedCards.length === 3){
            checkReversed(ArrOfReversedCards);
        }
    }
    if(cards.length === 0){
        setResult(counter);
        const oldCards = [...document.querySelectorAll(".item")];
        oldCards.forEach( item => item.dataset.bgnumber = `0`);
        const show = showCongratulations();
        show(ArrOfReversedCards, clickCard, counter);
        const audio3 = document.getElementById("audio3");
        audio3.play();
    }
}
cardList.addEventListener(`click`, clickCard);

//Запускается, когда игрок захочет сыграть еще раз
const restart = (event) => {
    if(event.target.classList.contains(`restart`)){
        counter = 0;
        const final = document.getElementById(`final`);
        const rest = document.getElementsByClassName(`item`);
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